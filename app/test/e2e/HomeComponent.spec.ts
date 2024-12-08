describe('HomeComponent', () => {
    it('should redirect to login page when user is not authenticated', async () => {
        await page.goto('http://localhost:5173');

        expect(page.url()).toContain('/login');
    });
});
