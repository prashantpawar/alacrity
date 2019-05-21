const rpsFactoryAbi = [{"constant":false,"inputs":[{"name":"_player1","type":"address"},{"name":"_timeout_in_blocks","type":"uint256"},{"name":"_commitment","type":"bytes32"},{"name":"_wager_amount","type":"uint256"}],"name":"player0_start_game","outputs":[{"name":"_contract","type":"address"}],"payable":true,"stateMutability":"payable","type":"function"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_contract","type":"address"},{"indexed":false,"name":"_player0","type":"address"},{"indexed":false,"name":"_player1","type":"address"},{"indexed":false,"name":"_timeout_in_blocks","type":"uint256"},{"indexed":false,"name":"_commitment","type":"bytes32"},{"indexed":false,"name":"_wager_amount","type":"uint256"},{"indexed":false,"name":"_escrow_amount","type":"uint256"}],"name":"Created","type":"event"}];

const rpsAbi = [{"constant":false,"inputs":[{"name":"_salt","type":"bytes32"},{"name":"_hand0","type":"uint8"}],"name":"player0_reveal","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[],"name":"query_state","outputs":[{"name":"_state","type":"uint8"},{"name":"_outcome","type":"uint8"},{"name":"_timeout_in_blocks","type":"uint256"},{"name":"_previous_block","type":"uint256"},{"name":"_player0","type":"address"},{"name":"_player1","type":"address"},{"name":"_player0_commitment","type":"bytes32"},{"name":"_wager_amount","type":"uint256"},{"name":"_escrow_amount","type":"uint256"},{"name":"_salt","type":"bytes32"},{"name":"_hand0","type":"uint8"},{"name":"_hand1","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_hand1","type":"uint8"}],"name":"player1_show_hand","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[],"name":"player1_win_by_default","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[],"name":"player0_rescind","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"inputs":[{"name":"_player0","type":"address"},{"name":"_player1","type":"address"},{"name":"_timeout_in_blocks","type":"uint256"},{"name":"_commitment","type":"bytes32"},{"name":"_wager_amount","type":"uint256"}],"payable":true,"stateMutability":"payable","type":"constructor"}];

const rpsFactoryCode = "0x608060405234801561001057600080fd5b50610e08806100206000396000f3fe60806040526004361061003b576000357c0100000000000000000000000000000000000000000000000000000000900480639051c3a514610040575b600080fd5b6100a06004803603608081101561005657600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff1690602001909291908035906020019092919080359060200190929190803590602001909291905050506100e2565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b6000803433878787876100f361028a565b808673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001848152602001838152602001828152602001955050505050506040518091039082f08015801561018c573d6000803e3d6000fd5b50905090507f0c013fc1b773695e4db147b67ee73e6f7c8294360666826d7785e3a396130168813388888888893403604051808873ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018773ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200185815260200184815260200183815260200182815260200197505050505050505060405180910390a180915050949350505050565b604051610b428061029b8339019056fe608060405260008060006101000a81548160ff0219169083600381111561002257fe5b021790555060405160a080610b42833981018060405260a081101561004657600080fd5b8101908080519060200190929190805190602001909291908051906020019092919080519060200190929190805190602001909291905050506000600381111561008c57fe5b6000809054906101000a900460ff1660038111156100a657fe5b1415156100b257600080fd5b80341115156100c057600080fd5b80600681905550600654340360078190555084600360006002811015156100e357fe5b0160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550836003600160028110151561013357fe5b0160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550826001819055508160058190555060016000806101000a81548160ff0219169083600381111561019e57fe5b0217905550436002819055505050505050610984806101be6000396000f3fe608060405260043610610067576000357c01000000000000000000000000000000000000000000000000000000009004806301b1f3461461006c578063670eefd1146100a75780639fbe35ee1461019f578063ba2f3181146101d0578063d2af80e3146101da575b600080fd5b6100a56004803603604081101561008257600080fd5b8101908080359060200190929190803560ff1690602001909291905050506101e4565b005b3480156100b357600080fd5b506100bc6103db565b604051808d60038111156100cc57fe5b60ff1681526020018c60058111156100e057fe5b60ff1681526020018b81526020018a81526020018973ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018873ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018781526020018681526020018581526020018481526020018360ff1660ff1681526020018260ff1660ff1681526020019c5050505050505050505050505060405180910390f35b6101ce600480360360208110156101b557600080fd5b81019080803560ff1690602001909291905050506104ce565b005b6101d8610573565b005b6101e2610611565b005b600260038111156101f157fe5b6000809054906101000a900460ff16600381111561020b57fe5b14151561021757600080fd5b61021f6106ac565b60038160ff1610801561028957508181604051602001808381526020018260ff1660ff167f01000000000000000000000000000000000000000000000000000000000000000281526001019250505060405160208183030381529060405280519060200120600554145b151561029457600080fd5b60006003826003600960019054906101000a900460ff16010360ff168115156102b957fe5b06905060018160ff161415610303576002600960026101000a81548160ff021916908360058111156102e757fe5b02179055506102fe60075460065460020201610719565b610391565b60028160ff161415610351576003600960026101000a81548160ff0219169083600581111561032e57fe5b0217905550610341600654600202610794565b61034c600754610719565b610390565b6001600960026101000a81548160ff0219169083600581111561037057fe5b0217905550610380600654610794565b61038f60075460065401610719565b5b5b8260088190555081600960006101000a81548160ff021916908360ff16021790555060036000806101000a81548160ff021916908360038111156103d157fe5b0217905550505050565b6000806000806000806000806000806000806000809054906101000a900460ff16600960029054906101000a900460ff166001546002546003600060028110151561042257fe5b0160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff166003600160028110151561045457fe5b0160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16600554600654600754600854600960009054906101000a900460ff16600960019054906101000a900460ff168797508696509b509b509b509b509b509b509b509b509b509b509b509b50909192939495969798999a9b565b600160038111156104db57fe5b6000809054906101000a900460ff1660038111156104f557fe5b14151561050157600080fd5b61050961080f565b6006543414151561051957600080fd5b60038160ff1610151561052b57600080fd5b80600960016101000a81548160ff021916908360ff16021790555060026000806101000a81548160ff0219169083600381111561056457fe5b02179055504360028190555050565b6002600381111561058057fe5b6000809054906101000a900460ff16600381111561059a57fe5b1415156105a657600080fd5b6105ae6108d5565b6105b6610942565b6004600960026101000a81548160ff021916908360058111156105d557fe5b02179055506105ec60075460065460020201610794565b60036000806101000a81548160ff0219169083600381111561060a57fe5b0217905550565b6001600381111561061e57fe5b6000809054906101000a900460ff16600381111561063857fe5b14151561064457600080fd5b61064c6106ac565b610654610942565b6005600960026101000a81548160ff0219169083600581111561067357fe5b021790555061068760075460065401610719565b60036000806101000a81548160ff021916908360038111156106a557fe5b0217905550565b3373ffffffffffffffffffffffffffffffffffffffff16600360006002811015156106d357fe5b0160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1614151561071757600080fd5b565b6003600060028110151561072957fe5b0160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166108fc829081150290604051600060405180830381858888f19350505050158015610790573d6000803e3d6000fd5b5050565b600360016002811015156107a457fe5b0160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166108fc829081150290604051600060405180830381858888f1935050505015801561080b573d6000803e3d6000fd5b5050565b600073ffffffffffffffffffffffffffffffffffffffff166003600160028110151561083757fe5b0160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1614156108ca57336003600160028110151561088657fe5b0160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055506108d3565b6108d26108d5565b5b565b3373ffffffffffffffffffffffffffffffffffffffff16600360016002811015156108fc57fe5b0160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1614151561094057600080fd5b565b600154600254014311151561095657600080fd5b56fea165627a7a723058205d461795e9fc7c0243c52b968918b03704806b3d81ad8a1174ed9d4e72bcff470029a165627a7a723058206587c7f3d7301d12a0263c02c74523e107d983a1115d0963c69186a5b8e4874c0029";
