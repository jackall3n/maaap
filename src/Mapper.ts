class Options<TSource> {
  constructor(private source: TSource) {}

  public mapFrom(member: (source: TSource) => any) {
    return member(this.source);
  };
}

type NonFunctionPropertyNames<T> = { [K in keyof T]: T[K] extends (...args: any[]) => any ? never : K }[keyof T] &
  string;

class Map<TSource, TDestination> {
  constructor(private destinationType: any) {}

  private members: [string, (options: Options<TSource>) => any][] = [];

  public for(member: NonFunctionPropertyNames<Required<TDestination>>, options: (options: Options<TSource>) => any) {
    this.members.push([member, options]);

    return this;
  }

  public map(source: TSource) {
    const opts = new Options(source);

    const destination = new this.destinationType();

    for (let [member, option] of this.members) {
      destination[member] = option(opts);
    }

    return destination;
  }
}

export interface IProfile {
  sourceType: any;
  destinationType: any;
  createMap(destinationType: any): any;
  map(source: any): any;
}

export class Profile<TSource, TDestination> implements IProfile {
  _map!: Map<TSource, TDestination>;
  destinationType!: any;
  sourceType!: any;

  createMap(destinationType: any) {
    this._map = Mapper.createMap<TSource, TDestination>(destinationType);
    return this._map;
  }

  map(source: TSource) {
    return this._map.map(source);
  }
}

class MapperConfiguration {
  profiles: IProfile[] = [];

  createMap<TSource, TDestination>(destinationType: any) {
    return new Map<TSource, TDestination>(destinationType);
  }

  addProfile(profile: IProfile) {
    this.profiles.push(profile);
  }
}

class Mapper {
  static configuration: MapperConfiguration;

  static createMap<TSource, TDestination>(destinationType: any) {
    return new Map<TSource, TDestination>(destinationType);
  }

  static initialize(config: (mapper: MapperConfiguration) => void) {
    const configuration = new MapperConfiguration();

    config(configuration);

    Mapper.configuration = configuration;
  }

  static map<TDestination>(source: any, destination: any) {
    const profile = Mapper.configuration.profiles.find(profile => {
      return profile.destinationType === destination && source instanceof profile.sourceType;
    });

    if (!profile) {
      throw new Error(`There is no profile for the type ${typeof source}`);
    }

    return profile.map(source);
  }
}

export { Mapper };
