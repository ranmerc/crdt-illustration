import GCounter from "@/lib/GCounter";

export default function mergeCounters(counters: GCounter[]) {
  for (let i = 0; i < counters.length; i++) {
    for (let j = 0; j < counters.length; j++) {
      if (i !== j) {
        counters[i].merge(counters[j]);
      }
    }
  }
}
