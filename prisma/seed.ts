import { PrismaClient, PlanType, UserRole } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting seed...");

  // Create demo business
  const business = await prisma.business.upsert({
    where: { slug: "demo-coffee" },
    update: {},
    create: {
      name: "Beanix & Brews Demo",
      slug: "demo-coffee",
      plan: PlanType.STARTER,
      colors: {
        primary: "#8B4513",
        secondary: "#D2691E",
      },
      limits: {
        maxProducts: 50,
        maxOrders: 200,
        maxUsers: 5,
      },
    },
  });
  console.log("✅ Business created:", business.name);

  // Create owner user
  const hashedPassword = await bcrypt.hash("password123", 10);
  const owner = await prisma.user.upsert({
    where: {
      businessId_email: {
        businessId: business.id,
        email: "owner@beanix.com",
      },
    },
    update: {},
    create: {
      businessId: business.id,
      email: "owner@beanix.com",
      password: hashedPassword,
      name: "Demo Owner",
      role: UserRole.OWNER,
    },
  });
  console.log("✅ Owner created:", owner.email, "| Password: password123");

  // Create staff user
  const staff = await prisma.user.upsert({
    where: {
      businessId_email: {
        businessId: business.id,
        email: "staff@beanix.com",
      },
    },
    update: {},
    create: {
      businessId: business.id,
      email: "staff@beanix.com",
      password: hashedPassword,
      name: "Staff Demo",
      role: UserRole.STAFF,
    },
  });
  console.log("✅ Staff created:", staff.email, "| Password: password123");

  // Create business settings
  await prisma.businessSettings.upsert({
    where: { businessId: business.id },
    update: {},
    create: {
      businessId: business.id,
      taxRate: 10,
      deliveryFee: 5000,
      minOrder: 20000,
      operatingHours: {
        monday: { open: "08:00", close: "22:00", isClosed: false },
        tuesday: { open: "08:00", close: "22:00", isClosed: false },
        wednesday: { open: "08:00", close: "22:00", isClosed: false },
        thursday: { open: "08:00", close: "22:00", isClosed: false },
        friday: { open: "08:00", close: "22:00", isClosed: false },
        saturday: { open: "08:00", close: "23:00", isClosed: false },
        sunday: { open: "09:00", close: "21:00", isClosed: false },
      },
    },
  });
  console.log("✅ Business settings created");

  // Create categories
  const coffeeCategory = await prisma.category.upsert({
    where: {
      businessId_slug: {
        businessId: business.id,
        slug: "coffee",
      },
    },
    update: {},
    create: {
      businessId: business.id,
      name: "Coffee",
      slug: "coffee",
      icon: "☕",
      displayOrder: 1,
    },
  });

  const nonCoffeeCategory = await prisma.category.upsert({
    where: {
      businessId_slug: {
        businessId: business.id,
        slug: "non-coffee",
      },
    },
    update: {},
    create: {
      businessId: business.id,
      name: "Non-Coffee",
      slug: "non-coffee",
      icon: "🥤",
      displayOrder: 2,
    },
  });

  const foodCategory = await prisma.category.upsert({
    where: {
      businessId_slug: {
        businessId: business.id,
        slug: "food",
      },
    },
    update: {},
    create: {
      businessId: business.id,
      name: "Food & Snacks",
      slug: "food",
      icon: "🍰",
      displayOrder: 3,
    },
  });

  console.log("✅ Categories created: Coffee, Non-Coffee, Food");

  // Create coffee products
  const americano = await prisma.product.upsert({
    where: {
      businessId_slug: {
        businessId: business.id,
        slug: "americano",
      },
    },
    update: {},
    create: {
      businessId: business.id,
      categoryId: coffeeCategory.id,
      name: "Americano",
      slug: "americano",
      description: "Classic espresso with hot water. Bold and smooth.",
      price: 25000,
      stock: 100,
      hasVariants: true,
      isFeatured: true,
    },
  });

  const cappuccino = await prisma.product.upsert({
    where: {
      businessId_slug: {
        businessId: business.id,
        slug: "cappuccino",
      },
    },
    update: {},
    create: {
      businessId: business.id,
      categoryId: coffeeCategory.id,
      name: "Cappuccino",
      slug: "cappuccino",
      description: "Espresso with steamed milk and thick foam.",
      price: 30000,
      stock: 100,
      hasVariants: true,
      isFeatured: true,
    },
  });

  const latte = await prisma.product.upsert({
    where: {
      businessId_slug: {
        businessId: business.id,
        slug: "caffe-latte",
      },
    },
    update: {},
    create: {
      businessId: business.id,
      categoryId: coffeeCategory.id,
      name: "Caffe Latte",
      slug: "caffe-latte",
      description: "Smooth espresso with steamed milk.",
      price: 32000,
      stock: 100,
      hasVariants: true,
      isFeatured: true,
    },
  });

  const mocha = await prisma.product.upsert({
    where: {
      businessId_slug: {
        businessId: business.id,
        slug: "mocha",
      },
    },
    update: {},
    create: {
      businessId: business.id,
      categoryId: coffeeCategory.id,
      name: "Mocha",
      slug: "mocha",
      description: "Chocolate and espresso perfection.",
      price: 35000,
      stock: 100,
      hasVariants: true,
    },
  });

  console.log("✅ Coffee products created: 4 items");

  // Create variants for Americano
  const variants = await Promise.all([
    prisma.productVariant.create({
      data: {
        productId: americano.id,
        name: "Hot - Regular",
        priceAdjustment: 0,
        stock: 100,
        attributes: { temperature: "hot", size: "regular" },
      },
    }),
    prisma.productVariant.create({
      data: {
        productId: americano.id,
        name: "Iced - Regular",
        priceAdjustment: 2000,
        stock: 100,
        attributes: { temperature: "iced", size: "regular" },
      },
    }),
    prisma.productVariant.create({
      data: {
        productId: americano.id,
        name: "Hot - Large",
        priceAdjustment: 5000,
        stock: 100,
        attributes: { temperature: "hot", size: "large" },
      },
    }),
    prisma.productVariant.create({
      data: {
        productId: americano.id,
        name: "Iced - Large",
        priceAdjustment: 7000,
        stock: 100,
        attributes: { temperature: "iced", size: "large" },
      },
    }),
  ]);

  console.log("✅ Variants created for Americano:", variants.length);

  // Create non-coffee products
  const matcha = await prisma.product.upsert({
    where: {
      businessId_slug: {
        businessId: business.id,
        slug: "matcha-latte",
      },
    },
    update: {},
    create: {
      businessId: business.id,
      categoryId: nonCoffeeCategory.id,
      name: "Matcha Latte",
      slug: "matcha-latte",
      description: "Premium Japanese matcha with milk.",
      price: 35000,
      stock: 50,
      hasVariants: false,
    },
  });

  const chocolate = await prisma.product.upsert({
    where: {
      businessId_slug: {
        businessId: business.id,
        slug: "hot-chocolate",
      },
    },
    update: {},
    create: {
      businessId: business.id,
      categoryId: nonCoffeeCategory.id,
      name: "Hot Chocolate",
      slug: "hot-chocolate",
      description: "Rich and creamy chocolate drink.",
      price: 28000,
      stock: 50,
      hasVariants: false,
    },
  });

  console.log("✅ Non-coffee products created: 2 items");

  // Create food items
  const croissant = await prisma.product.upsert({
    where: {
      businessId_slug: {
        businessId: business.id,
        slug: "butter-croissant",
      },
    },
    update: {},
    create: {
      businessId: business.id,
      categoryId: foodCategory.id,
      name: "Butter Croissant",
      slug: "butter-croissant",
      description: "Freshly baked, flaky and buttery.",
      price: 18000,
      stock: 30,
      hasVariants: false,
    },
  });

  const cheesecake = await prisma.product.upsert({
    where: {
      businessId_slug: {
        businessId: business.id,
        slug: "blueberry-cheesecake",
      },
    },
    update: {},
    create: {
      businessId: business.id,
      categoryId: foodCategory.id,
      name: "Blueberry Cheesecake",
      slug: "blueberry-cheesecake",
      description: "Creamy cheesecake with blueberry topping.",
      price: 38000,
      stock: 20,
      hasVariants: false,
    },
  });

  console.log("✅ Food items created: 2 items");

  // Create sample customers
  const customer1 = await prisma.customer.create({
    data: {
      businessId: business.id,
      name: "John Doe",
      email: "john@example.com",
      phone: "+6281234567890",
      totalOrders: 5,
      totalSpent: 150000,
      points: 150,
    },
  });

  const customer2 = await prisma.customer.create({
    data: {
      businessId: business.id,
      name: "Jane Smith",
      email: "jane@example.com",
      phone: "+6281234567891",
      totalOrders: 3,
      totalSpent: 95000,
      points: 95,
    },
  });

  console.log("✅ Customers created: 2 customers");

  // Create sample event
  const event = await prisma.event.create({
    data: {
      businessId: business.id,
      title: "Grand Opening Promo",
      description:
        "Buy 2 Get 1 Free for all coffee drinks! Valid until end of month.",
      startDate: new Date(),
      endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // +30 days
      isAllDay: true,
      isActive: true,
    },
  });

  console.log("✅ Event created:", event.title);

  console.log("\n🎉 Seed completed successfully!");
  console.log("\n📋 SUMMARY:");
  console.log("   Business: Beanix & Brews Demo");
  console.log("   Users: 2 (owner@beanix.com, staff@beanix.com)");
  console.log("   Password: password123");
  console.log("   Categories: 3");
  console.log("   Products: 8");
  console.log("   Customers: 2");
  console.log("   Events: 1");
  console.log("\n✨ You can now run: npx prisma studio");
}

main()
  .catch((e) => {
    console.error("❌ Error seeding database:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
