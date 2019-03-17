import Mapper, { Profile } from '../../src';
import { Source } from './source';
import { Destination } from './destination';

class SourceDestinationMap extends Profile {
  constructor() {
    super();

    this.createMap<Source, Destination>()
      .forMember(m => m.title, opt => opt.mapFrom(s => s.header))
      .forMember(m => m.subtitle, opt => opt.mapFrom(s => s.subheading))
  }
}

Mapper.initialize(config => {
  config.addProfile(new SourceDestinationMap());
});

const source = new Source();

source.header = 'Header';
source.subheading = 'Sub Heading';

const output = Mapper.map<Destination>(source);

