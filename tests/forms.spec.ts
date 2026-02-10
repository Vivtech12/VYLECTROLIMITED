import { test, expect } from "@playwright/test";

const BASE_URL = "http://localhost:4321";

test.describe("Form Tests", () => {
	test.describe("Contact Page Form", () => {
		test("should display contact form with all required fields", async ({
			page,
		}) => {
			await page.goto(`${BASE_URL}/contact`);

			// Check form exists
			const form = page.locator("form");
			await expect(form).toBeVisible();

			// Check required fields exist
			await expect(page.locator('input[name="name"]')).toBeVisible();
			await expect(page.locator('input[name="email"]')).toBeVisible();
			await expect(page.locator('textarea[name="message"]')).toBeVisible();

			// Check submit button exists
			await expect(
				page.locator('button[type="submit"], input[type="submit"]')
			).toBeVisible();
		});

		test("should validate required fields on contact form", async ({
			page,
		}) => {
			await page.goto(`${BASE_URL}/contact`);

			// Try to submit empty form
			const submitButton = page.locator(
				'button[type="submit"], input[type="submit"]'
			);
			await submitButton.click();

			// Check that the form doesn't navigate away (validation should prevent submission)
			await expect(page).toHaveURL(`${BASE_URL}/contact`);
		});

		test("should accept valid input in contact form fields", async ({
			page,
		}) => {
			await page.goto(`${BASE_URL}/contact`);

			// Fill in the form
			await page.fill('input[name="name"]', "Test User");
			await page.fill('input[name="email"]', "test@example.com");
			await page.fill('textarea[name="message"]', "This is a test message");

			// Check values are filled
			await expect(page.locator('input[name="name"]')).toHaveValue(
				"Test User"
			);
			await expect(page.locator('input[name="email"]')).toHaveValue(
				"test@example.com"
			);
			await expect(page.locator('textarea[name="message"]')).toHaveValue(
				"This is a test message"
			);
		});
	});

	test.describe("Signup Page Form", () => {
		test("should display signup form with all sections", async ({ page }) => {
			await page.goto(`${BASE_URL}/signup`);

			// Check form exists
			const form = page.locator("form");
			await expect(form).toBeVisible();

			// Check for personal information fields
			await expect(page.locator('input[name="fullName"]')).toBeVisible();
			await expect(page.locator('input[name="email"]')).toBeVisible();
			await expect(page.locator('input[name="phone"]')).toBeVisible();

			// Check for business information fields
			await expect(page.locator('input[name="companyName"]')).toBeVisible();
			await expect(page.locator('select[name="accountType"]')).toBeVisible();
		});

		test("should validate email format on signup form", async ({ page }) => {
			await page.goto(`${BASE_URL}/signup`);

			// Try entering invalid email
			const emailInput = page.locator('input[name="email"]');
			await emailInput.fill("invalid-email");

			// Check that HTML5 validation will mark it as invalid
			const isInvalid = await emailInput.evaluate((el: HTMLInputElement) => {
				return !el.validity.valid;
			});
			expect(isInvalid).toBe(true);
		});
	});

	test.describe("Offer Stock Form (Homepage)", () => {
		test("should display offer stock form on homepage", async ({ page }) => {
			await page.goto(BASE_URL);

			// Scroll to offer stock section
			await page.locator("#offer-stock").scrollIntoViewIfNeeded();

			// Check form exists in this section
			const section = page.locator("#offer-stock");
			await expect(section.locator("form")).toBeVisible();

			// Check required fields
			await expect(
				section.locator('input[name="company"]')
			).toBeVisible();
			await expect(section.locator('input[name="email"]')).toBeVisible();
			await expect(
				section.locator('textarea[name="stock_details"]')
			).toBeVisible();
		});

		test("should accept valid input in offer stock form", async ({
			page,
		}) => {
			await page.goto(BASE_URL);

			// Scroll to offer stock section
			await page.locator("#offer-stock").scrollIntoViewIfNeeded();

			const section = page.locator("#offer-stock");

			// Fill in the form
			await section
				.locator('input[name="company"]')
				.fill("Test Supplier Ltd");
			await section
				.locator('input[name="email"]')
				.fill("supplier@example.com");
			await section.locator('input[name="phone"]').fill("+44 7777 123456");
			await section
				.locator('textarea[name="stock_details"]')
				.fill("100x iPhone 15 Pro, sealed boxes");

			// Verify values
			await expect(section.locator('input[name="company"]')).toHaveValue(
				"Test Supplier Ltd"
			);
			await expect(section.locator('input[name="email"]')).toHaveValue(
				"supplier@example.com"
			);
		});
	});

	test.describe("Stock List Registration Form (Homepage)", () => {
		test("should display stock list registration form on homepage", async ({
			page,
		}) => {
			await page.goto(BASE_URL);

			// Scroll to stock list section
			await page.locator("#stock-list").scrollIntoViewIfNeeded();

			// Check form exists in this section
			const section = page.locator("#stock-list");
			await expect(section.locator("form")).toBeVisible();

			// Check required fields
			await expect(
				section.locator('input[name="first_name"]')
			).toBeVisible();
			await expect(
				section.locator('input[name="last_name"]')
			).toBeVisible();
			await expect(
				section.locator('input[name="company"]')
			).toBeVisible();
			await expect(section.locator('input[name="email"]')).toBeVisible();
		});

		test("should accept valid input in stock list form", async ({ page }) => {
			await page.goto(BASE_URL);

			// Scroll to stock list section
			await page.locator("#stock-list").scrollIntoViewIfNeeded();

			const section = page.locator("#stock-list");

			// Fill in the form
			await section.locator('input[name="first_name"]').fill("John");
			await section.locator('input[name="last_name"]').fill("Smith");
			await section
				.locator('input[name="company"]')
				.fill("Buyer Electronics Ltd");
			await section
				.locator('input[name="email"]')
				.fill("john@buyerelectronics.com");
			await section.locator('input[name="phone"]').fill("+44 7888 999000");
			await section
				.locator('textarea[name="interests"]')
				.fill("Smartphones, Tablets, Gaming Consoles");

			// Verify values
			await expect(section.locator('input[name="first_name"]')).toHaveValue(
				"John"
			);
			await expect(section.locator('input[name="email"]')).toHaveValue(
				"john@buyerelectronics.com"
			);
		});
	});
});

test.describe("Page Navigation", () => {
	test("should navigate to all main pages", async ({ page }) => {
		// Home page
		await page.goto(BASE_URL);
		await expect(page).toHaveURL(BASE_URL + "/");

		// Contact page
		await page.goto(`${BASE_URL}/contact`);
		await expect(page).toHaveURL(`${BASE_URL}/contact`);

		// Signup page
		await page.goto(`${BASE_URL}/signup`);
		await expect(page).toHaveURL(`${BASE_URL}/signup`);
	});

	test("should have working navigation links", async ({ page }) => {
		await page.goto(BASE_URL);

		// Check navbar has contact link
		const contactLink = page.locator('a[href="/contact"]').first();
		await expect(contactLink).toBeVisible();

		// Check navbar has signup link
		const signupLink = page.locator('a[href="/signup"]').first();
		await expect(signupLink).toBeVisible();
	});
});

test.describe("New Sections Visibility", () => {
	test("should display Why Buy From Us section", async ({ page }) => {
		await page.goto(BASE_URL);

		const section = page.locator("#why-buy");
		await section.scrollIntoViewIfNeeded();
		await expect(section).toBeVisible();

		// Check heading
		await expect(
			section.locator("h2:has-text('Why Buy From Us')")
		).toBeVisible();

		// Check three cards are present
		const cards = section.locator(".group");
		await expect(cards).toHaveCount(3);
	});

	test("should display Supplier Network section", async ({ page }) => {
		await page.goto(BASE_URL);

		const section = page.locator("#supplier-network");
		await section.scrollIntoViewIfNeeded();
		await expect(section).toBeVisible();

		// Check heading
		await expect(
			section.locator("h2:has-text('Extensive Supplier Network')")
		).toBeVisible();
	});

	test("should display Offer Stock section", async ({ page }) => {
		await page.goto(BASE_URL);

		const section = page.locator("#offer-stock");
		await section.scrollIntoViewIfNeeded();
		await expect(section).toBeVisible();

		// Check heading
		await expect(
			section.locator("h2:has-text('Have Stock to Offer')")
		).toBeVisible();
	});

	test("should display Stock List section", async ({ page }) => {
		await page.goto(BASE_URL);

		const section = page.locator("#stock-list");
		await section.scrollIntoViewIfNeeded();
		await expect(section).toBeVisible();

		// Check heading
		await expect(
			section.locator("h2:has-text('Get Access to Our Stock List')")
		).toBeVisible();
	});
});
