interface MergeableType<T> {
  merge: (arg: T) => void;
}

export default function mergeSystems<T extends MergeableType<T>>(systems: T[]) {
  for (let i = 0; i < systems.length; i++) {
    for (let j = 0; j < systems.length; j++) {
      if (i !== j) {
        systems[i].merge(systems[j]);
      }
    }
  }
}
