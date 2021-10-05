import {SubstrateEvent} from "@subql/types";
import {timestamp, eventId} from "./globalFunction";
import {Reserved} from "../types/models";

import {Balance} from "@polkadot/types/interfaces";

export async function handleReserved(event: SubstrateEvent): Promise<void> {

    const {event: {data: [acountID, amount]}} = event;
    const address = acountID.toString();
    const amountBalance = (amount as Balance).toBigInt();
    const element = new Reserved(eventId(event));

    element.timestamp = timestamp(event.block);
    element.reservefrom = address;
    element.reserveAmount = amountBalance;

    await element.save()
    logger.info('Reserved from' + address);
}
