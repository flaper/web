export class UrlService {
  static getSearchParameters() {
    var prmstr = window.location.search.substr(1);
    return prmstr !== null && prmstr !== "" ? UrlService.transformToAssocArray(prmstr) : {};
  }

  static transformToAssocArray(prmstr) {
    var params = {};
    var prmarr = prmstr.split("&");
    for (var i = 0; i < prmarr.length; i++) {
      var tmparr = prmarr[i].split("=");
      params[tmparr[0]] = tmparr[1];
    }
    return params;
  }
}
