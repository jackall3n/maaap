// import Mapper from '../';
// import { Destination } from '../../examples/mapper-profile/destination';
// import { Source } from '../../examples/mapper-profile/source';
// import { Profile } from '../Mapper';
//
// class SourceDestinationMap extends Profile<Source, Destination> {
//
//   constructor() {
//     super();
//
//     this.sourceType = Source;
//     this.destinationType = Destination;
//
//     this.createMap(Destination)
//       .for("title", opt => opt.mapFrom(s => s.header))
//       .for("subtitle",  opt => opt.mapFrom(s => s.subheading))
//       .for("name",  opt => opt.mapFrom(s => this.name(s)))
//   }
//
//   private name(source: Source) {
//       return source.user.name;
//   }
// }
//
// Mapper.initialize(config => {
//   config.addProfile(new SourceDestinationMap());
//   config.createMap<Source, Destination>(Symbol('Destination'))
// });
//
// const source = new Source();
//
// source.header = 'Header';
// source.subheading = 'Subheading';
// source.user.name = 'JackAll3n';
//
// const output = Mapper.map<Destination>(source, Destination);
//
// test("Profile", () => {
//   expect(output).toEqual({});
// });