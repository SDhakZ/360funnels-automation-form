import { describe, it, expect } from "vitest";
import {
  step1ValidationSchema,
  step2ValidationSchema,
  step3ValidationSchema,
} from "./validationSchema";

describe("Form Validation Schemas", () => {
  describe("step1ValidationSchema", () => {
    const validStep1 = {
      email: "test@example.com",
      brandName: "My Brand",
      phone: "1234567890",
      shopifyStoreUrl: "https://mystore.myshopify.com",
      brandBookId: null,
      primaryFont: "Arial",
      secondaryFont: "Helvetica",
      primaryColor: "#1A2B3C",
      secondaryColor: "#4D5E6F",
      otherColors: "",
      thirdPartyCheckoutApps: "",
      maxDiscount: "50%",
      brandPortrayal: "Premium, luxurious brand",
    };

    it("should accept valid step1 data", () => {
      const result = step1ValidationSchema.safeParse(validStep1);
      expect(result.success).toBe(true);
    });

    it("should auto-add # to hex color if missing", () => {
      const data = { ...validStep1, primaryColor: "1A2B3C" };
      const result = step1ValidationSchema.safeParse(data);
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.primaryColor).toBe("#1A2B3C");
      }
    });

    it("should reject invalid hex colors", () => {
      const data = { ...validStep1, primaryColor: "notahexcolor" };
      const result = step1ValidationSchema.safeParse(data);
      expect(result.success).toBe(false);
      if (!result.success) {
        const hasColorError = result.error.issues.some(
          (issue) => issue.path[0] === "primaryColor",
        );
        expect(hasColorError).toBe(true);
      }
    });

    it("should reject 4 or 5 digit hex colors", () => {
      const data = { ...validStep1, primaryColor: "#1A2B" };
      const result = step1ValidationSchema.safeParse(data);
      expect(result.success).toBe(false);
    });

    it("should reject invalid email", () => {
      const data = { ...validStep1, email: "not-an-email" };
      const result = step1ValidationSchema.safeParse(data);
      expect(result.success).toBe(false);
      if (!result.success) {
        const hasEmailError = result.error.issues.some(
          (issue) => issue.path[0] === "email",
        );
        expect(hasEmailError).toBe(true);
      }
    });

    it("should accept valid Shopify URLs", () => {
      const validUrls = [
        "https://mystore.myshopify.com",
        "http://mystore.myshopify.com",
        "mystore.myshopify.com",
      ];

      for (const url of validUrls) {
        const data = { ...validStep1, shopifyStoreUrl: url };
        const result = step1ValidationSchema.safeParse(data);
        expect(result.success).toBe(true);
      }
    });

    it("should reject invalid URLs", () => {
      const data = { ...validStep1, shopifyStoreUrl: "not a url" };
      const result = step1ValidationSchema.safeParse(data);
      expect(result.success).toBe(false);
    });

    it("should require brandName", () => {
      const data = { ...validStep1, brandName: "" };
      const result = step1ValidationSchema.safeParse(data);
      expect(result.success).toBe(false);
    });

    it("should require phone", () => {
      const data = { ...validStep1, phone: "" };
      const result = step1ValidationSchema.safeParse(data);
      expect(result.success).toBe(false);
    });
  });

  describe("step2ValidationSchema", () => {
    const validStep2 = {
      bestSellingProducts: ["Product1", "Product2"],
      productsWantToSell: [],
      releaseFrequency: "Weekly",
      realeaseFrequencyAdditionalNotes: "",
      ageRange: "",
      gender: "",
      painPoints: "",
      biggestFear: "",
      customerStory: "",
      brandAdvantages: "High quality",
      brandProblems: "",
      brandFAQs: "",
      brandCompetitors: "",
    };

    it("should accept valid step2 data", () => {
      const result = step2ValidationSchema.safeParse(validStep2);
      expect(result.success).toBe(true);
    });

    it("should require at least 1 best selling product", () => {
      const data = { ...validStep2, bestSellingProducts: [] };
      const result = step2ValidationSchema.safeParse(data);
      expect(result.success).toBe(false);
    });

    it("should allow max 5 best selling products", () => {
      const data = {
        ...validStep2,
        bestSellingProducts: ["P1", "P2", "P3", "P4", "P5"],
      };
      const result = step2ValidationSchema.safeParse(data);
      expect(result.success).toBe(true);
    });

    it("should reject more than 5 best selling products", () => {
      const data = {
        ...validStep2,
        bestSellingProducts: ["P1", "P2", "P3", "P4", "P5", "P6"],
      };
      const result = step2ValidationSchema.safeParse(data);
      expect(result.success).toBe(false);
    });

    it("should allow optional demographic fields", () => {
      const data = {
        ...validStep2,
        ageRange: "25-35",
        gender: "All",
      };
      const result = step2ValidationSchema.safeParse(data);
      expect(result.success).toBe(true);
    });
  });

  describe("step3ValidationSchema", () => {
    const validStep3 = {
      shippingInfo: "Worldwide shipping",
      adLibraryLink: "",
      extraNotes: "",
    };

    it("should accept valid step3 data", () => {
      const result = step3ValidationSchema.safeParse(validStep3);
      expect(result.success).toBe(true);
    });

    it("should allow empty adLibraryLink", () => {
      const result = step3ValidationSchema.safeParse(validStep3);
      expect(result.success).toBe(true);
    });

    it("should validate adLibraryLink if provided", () => {
      const data = {
        ...validStep3,
        adLibraryLink: "https://facebook.com/library",
      };
      const result = step3ValidationSchema.safeParse(data);
      expect(result.success).toBe(true);
    });

    it("should validate adLibraryLink URL format", () => {
      const data = {
        ...validStep3,
        adLibraryLink: "not a url",
      };
      const result = step3ValidationSchema.safeParse(data);
      expect(result.success).toBe(false);
    });

    it("should require shippingInfo", () => {
      const data = { shippingInfo: "", adLibraryLink: "", extraNotes: "" };
      const result = step3ValidationSchema.safeParse(data);
      expect(result.success).toBe(false);
    });

    it("should allow optional extraNotes", () => {
      const data = {
        ...validStep3,
        extraNotes: "Some additional notes",
      };
      const result = step3ValidationSchema.safeParse(data);
      expect(result.success).toBe(true);
    });
  });
});
