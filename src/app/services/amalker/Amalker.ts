export class Amalker {
  static show({type, id, size}) {
    googletag.cmd.push(function () {
      if (dfp[id]) {
        googletag.pubads().refresh([dfp[id]]);
        googletag.display(id);
        return;
      }
      dfp[id] = googletag.defineSlot(type, size, id).addService(googletag.pubads());
      googletag.pubads().enableSingleRequest();
      googletag.pubads().collapseEmptyDivs();
      googletag.enableServices();
      googletag.display(id);
    });
  }
}
