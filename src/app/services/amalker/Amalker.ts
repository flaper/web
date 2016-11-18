export class Amalker {
  static init = false;

  static show({type, id, size}) {
    googletag.cmd.push(function () {
      if (dfp[id]) {
        googletag.pubads().refresh([dfp[id]]);
        googletag.display(id);
        return;
      }
      dfp[id] = googletag.defineSlot(type, size, id).addService(googletag.pubads());

      if (!Amalker.init) {
        googletag.pubads().enableSingleRequest();
        googletag.pubads().collapseEmptyDivs();
        Amalker.init = true;
      }
      googletag.enableServices();
      googletag.display(id);
    });
  }
}
