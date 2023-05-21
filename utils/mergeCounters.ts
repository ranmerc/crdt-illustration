import GCounter from "@/lib/GCounter";
import PNCounter from "@/lib/PNCounter";

interface MergeableType<T> {
  merge: (arg: T) => void;
}

export default function mergeCounters<T extends MergeableType<T>>(
  counters: T[]
) {
  for (let i = 0; i < counters.length; i++) {
    for (let j = 0; j < counters.length; j++) {
      if (i !== j) {
        counters[i].merge(counters[j]);
      }
    }
  }
}
