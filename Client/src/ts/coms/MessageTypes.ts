
enum MessageTypes {
    IdRequest = 'ID_REQ',
    RegisterRequest = 'REG_REQ',
    LoginRequest = 'LGN_REQ',
    AccountInfoRequest = 'ACC_REQ',
    LeaderboardRequest = 'LED_REQ',
    RoomRequest = 'ROO_REQ',
    LeaveRoomRequest = 'LEV_REQ',

    ClientTick = 'CLI_TIC',
    ServerTick = 'SRV_TIC',
    ClientDied = 'CLI_DED',
}

export default MessageTypes;
