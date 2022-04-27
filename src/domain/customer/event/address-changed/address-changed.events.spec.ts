import EventDispatcher from "../../../@shared/event/event-dispatcher";
import AddressChangedEvent from "./address-changed.events";
import EnviaConsoleLog1Handler from "./handler/envia-console-log-handler";

describe("Domain events tests", () => {
  it("should notify all event handlers", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new EnviaConsoleLog1Handler();
    const spyEventHandler = jest.spyOn(eventHandler, "handle");

    eventDispatcher.register("AddressChangedEvent", eventHandler);

    expect(
      eventDispatcher.getEventHandlers["AddressChangedEvent"][0]
    ).toMatchObject(eventHandler);

    const costumerCreatedEvent = new AddressChangedEvent({
      id: "1",
      name: "José",
      address: {
        street: "Rua dos bobos",
        number: 0,
        zip: "0",
        city: "N/A"
      }
    });

    eventDispatcher.notify(costumerCreatedEvent);

    expect(spyEventHandler).toHaveBeenCalled();
  });
});
