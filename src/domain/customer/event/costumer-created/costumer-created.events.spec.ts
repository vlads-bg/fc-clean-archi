import EventDispatcher from "../../../@shared/event/event-dispatcher";
import CostumerCreatedEvent from "./costumer-created.events";
import EnviaConsoleLog1Handler from "./handler/envia-console-log-1-handler";
import EnviaConsoleLog2Handler from "./handler/envia-console-log-2-handler";


describe("Domain events tests", () => {
  it("should notify all event handlers", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler1 = new EnviaConsoleLog1Handler();
    const eventHandler2 = new EnviaConsoleLog2Handler();
    const spyEventHandler1 = jest.spyOn(eventHandler1, "handle");
    const spyEventHandler2 = jest.spyOn(eventHandler2, "handle");

    eventDispatcher.register("CostumerCreatedEvent", eventHandler1);
    eventDispatcher.register("CostumerCreatedEvent", eventHandler2);

    expect(
      eventDispatcher.getEventHandlers["CostumerCreatedEvent"][0]
    ).toMatchObject(eventHandler1);

    expect(
        eventDispatcher.getEventHandlers["CostumerCreatedEvent"][1]
      ).toMatchObject(eventHandler2);

    const costumerCreatedEvent = new CostumerCreatedEvent({
      name: "",
      address: "",
    });

    eventDispatcher.notify(costumerCreatedEvent);

    expect(spyEventHandler1).toHaveBeenCalled();
    expect(spyEventHandler2).toHaveBeenCalled();
  });
});
