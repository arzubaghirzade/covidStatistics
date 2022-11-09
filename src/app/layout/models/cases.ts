export class CasesObject {
  deaths!: number;
  confirmed!: number;
  recovered!: number;
  static jsonToModel(jsonObject: CasesObject): CasesObject {
    const cases = new CasesObject();
    cases.deaths = jsonObject.deaths;
    cases.confirmed = jsonObject.confirmed;
    cases.recovered = jsonObject.recovered;
    return cases;
  }
}
