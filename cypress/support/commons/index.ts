import { TestAccount } from '../types/TestAccount';

export function visitPage(page: string, ignoreCookies?: boolean) {
  cy.visit(`${page}?network=goerlifork`, {
    onBeforeLoad: win => {
      // If an account is sent, connect with that one
    }
  }).then(() => {
    if (!ignoreCookies) {
      cy.contains('Accept configured cookies').click();
    }
  });
}

export function elementExist(selector: string) {
  return cy.get(selector).should('be.visible');
}

export function clickElement(selector: string) {
  cy.get(selector).click();
}

export function elementContainsText(selector: string, text: string) {
  cy.get(selector).contains(text);
}

export async function setAccount(account: TestAccount, cb: () => void) {
  cy.window().then(win => {
    if (!('setAccount' in win)) return;
    (win as any).setAccount(account.address, account.key);
    cy.get('[data-testid="active-network-name"]').contains(/goerlifork/i);
    cb();
  });
}

export function closeModal() {
  cy.get('[aria-label="close"]').click();
}

// Fork to a new block
export function forkNetwork(block) {
  // Must refund accounts after forking
  cy.exec(`npx hardhat fork --network localhost --block ${block}`).exec('yarn fund');
}
