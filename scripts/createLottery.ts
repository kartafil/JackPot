import { toNano } from '@ton/core';
import { LotteryAdmin } from '../wrappers/LotteryAdmin';
import { NetworkProvider } from '@ton/blueprint';

export async function run(provider: NetworkProvider) {
    const lotteryAdmin = provider.open(await LotteryAdmin.fromInit(0n));

    await lotteryAdmin.send(
        provider.sender(),
        {
            value: toNano('0.15'),
        },
        {
            $$type: 'CreateLottery',
            query_id: 0n,
            duration: 10n,
            min_bet: toNano('0.2'),
            creator_address: null,
            goal_price: toNano('1')
        }
    );

    console.log(lotteryAdmin.address);
    await provider.waitForDeploy(lotteryAdmin.address);

    // run methods on `lotteryAdmin`
}
