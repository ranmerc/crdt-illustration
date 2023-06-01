export default interface Store<T> {
  /**
   * Set of all subscribed listeners of
   * the store
   */
  listeners: Set<Function>;

  /**
   * Returns the current data of the store
   *
   * React will rerender whenever value returned
   * by this function changes
   */
  getSnapshot: () => T;

  /**
   * Subscribes the listener to the changes and
   * returns an unsubscribe function.
   *
   * Listener is invoked with the new value every
   * time is there is a change
   */
  subscribe: (listener: Function) => () => void;

  /**
   * Notifies all the listeners about the change
   *
   * All listeners are called with the current value
   * usually after an change occurs
   */
  notifyListeners: () => void;

  /**
   * Returns initial data in the store
   * for server side rendering.
   *
   * Will throw error if omitted
   */
  getServerSnapshot: () => T;
}
