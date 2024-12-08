describe('LoginComponent', () => {
    it('should display error if user connects with bad credentials', async () => {
        await page.route('**/open/login', route => route.fulfill({ status: 400 }));

        await page.goto('http://localhost:5173/login');
        await page.locator('input[id="email"]').fill('mail@mail.fr');
        await page.locator('input[id="password"]').fill('badPassword');
        await page.getByTestId('submit').click();

        expect(await page.getByTestId('error').innerText()).toBe('Connexion impossible');
    });

    it('should store user token and redirect to home when user has successfully logged', async () => {
        const context = await browser.newContext();
        const page = await context.newPage();

        await page.route('**/open/login', route => route.fulfill({ status: 200, json: { token: 'token' } }));

        await page.goto('http://localhost:5173/login');
        await page.locator('input[id="email"]').fill('mail@mail.fr');
        await page.locator('input[id="password"]').fill('Passw0rd');
        await page.getByTestId('submit').click();
        await page.waitForTimeout(2000);

        const state = await context.storageState();
        expect(page.url().endsWith('/')).toBeTruthy();
        expect(state.origins[0].localStorage).toEqual([{ name: 'token', value: 'token' }]);

        await context.close();
    });
});
