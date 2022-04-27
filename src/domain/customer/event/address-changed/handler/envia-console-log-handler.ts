import EventHandlerInterface from "../../../../@shared/event/event-handler.interface";
import AddressChangedEvent from "../address-changed.events";

export default class EnviaConsoleLog1Handler
    implements EventHandlerInterface<AddressChangedEvent>
{
    handle(event: AddressChangedEvent): void {
        const { id, name, address } = event.eventData;
        const { street, number, zip, city } = address;
        console.log(`Endereço do cliente: ${id}, ${name} alterado para: ${street}, ${number}, ${zip}, ${city}`);
    }
}
