import {expect, test} from '@playwright/test';

test('Automated the QusoAI site', async ({browser}) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto('https://quso.ai/');

    const [newTab] = await Promise.all([
        context.waitForEvent('page'), // Wait for the new tab to open
        page.locator('a.button-quso.login-navbar:has-text("Login")').nth(0).click()
    ]);

    await newTab.locator('#auth-email-password-btn').click();
    await newTab.waitForSelector('input[type="email"]', { state: 'attached' });
    await newTab.locator('input[type="email"]').fill('vikram0812+assignment@proton.me');
    await newTab.locator('input[type="password"]').fill('Assignment@2024');
    await newTab.locator('button[type="submit"]').click();
    await newTab.waitForNavigation({waitUntil: 'domcontentloaded'});

    await newTab.locator('#create-ai-clips').click();
    await newTab.waitForSelector('.ai-clip-page', {state: 'attached'});

    const fileInput = await newTab.locator('input[type="file"]');
    await fileInput.setInputFiles('path/to/your/video.mp4');
    await newTab.waitForSelector('.clip-generated', { state: 'attached' });  
    await newTab.locator('text="Processing..."').waitFor({ state: 'detached' });
    await newTab.locator('text="Project"').click();
    await newTab.waitForSelector('.project-page', {state: 'attached'});
    const clipNameLocator = await newTab.locator('.clip-name');
    await clipNameLocator.first().click();
    await clipNameLocator.first().fill('Your Name');

    await newTab.locator('.clip-edit-button').first().click();
    await newTab.waitForSelector('.editor-page', { state: 'attached' });
    await newTab.locator('text="Viral"').click();
    const trimButton = await newTab.locator('.trim-button');
    await trimButton.click();
    const trimStartInput = await newTab.locator('#trim-start');
    await trimStartInput.fill('0');
    const trimEndInput = await newTab.locator('#trim-end');
    await trimEndInput.fill('25');
    await newTab.locator('.save-trim').click();


    const downloadButton = await newTab.locator('.download-button');
    await downloadButton.click();
    await newTab.waitForSelector('.downloaded-video', { state: 'attached' });


    await newTab.locator('.re-upload-button').click();
    const reUploadInput = await newTab.locator('input[type="file"]');
    await reUploadInput.setInputFiles('path/to/downloaded/video.mp4');
    await newTab.locator('text="Modern"').click();


    await newTab.locator('.download-button').click();
    await newTab.waitForSelector('.final-downloaded-video', { state: 'attached' });
});
