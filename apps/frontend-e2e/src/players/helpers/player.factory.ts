// Creates test data object
export type TestPlayerData = {
    firstName: string;
    lastName: string;
    skillRate: string;
    nickname: string;
    preferredPosition: string;
};  
export function createTestPlayer(uniqueId: number): TestPlayerData {
    return {
        firstName: 'Test Name' + uniqueId,
        lastName: 'Test LastName' + uniqueId,
        skillRate: '6',
        nickname: 'Test Nickname' + uniqueId,
        preferredPosition: 'Napastnik'
    };
}