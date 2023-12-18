import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import Routes from '../src/routes/index';

const ENV = 'https://react-bootstrap.netlify.app';
const url = '/docs/components';
const routes = Object.values(Routes);


// iterage over routes and run the same axeBuilder.analyze on each route
routes.forEach((route) => {
  test(`Accessibility test on ${route.name}`, async ({ page }) => {
    await page.goto(`${ENV}${url}${route.path}`);
    const axeBuilder = await new AxeBuilder({ page });
    axeBuilder.disableRules('color-contrast');
    const results = await axeBuilder.analyze();
    console.log(results);
    expect(results.violations).toEqual([]);
  });
});
