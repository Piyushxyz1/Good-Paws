
import "dotenv/config";

import { PrismaClient } from "../app/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL is missing from .env");
}

const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

const products = [
  {
    slug: "premium-dog-food",
    name: "Premium Dog Food",
    description: `
WHY CONSIDER THIS PRODUCT?

• Everyday feeding: A practical option to consider when planning your dog's regular meals.
• Convenient routine: Helps make daily feeding easier to organise at home.
• Portion awareness: Makes it easier to establish consistent mealtimes and monitor how much your dog eats.
• Individual feeding needs: Your dog's age, size, activity level and body condition should guide your feeding decisions.

HOW TO USE

1. Read the feeding instructions and nutritional information printed on the actual package before serving.
2. Follow the manufacturer's recommended serving guidance for your dog's weight and life stage.
3. Introduce a new food gradually according to veterinary guidance or the manufacturer's instructions.
4. Keep fresh drinking water available at all times.
5. Monitor appetite, digestion and body condition when changing your dog's diet.

CHOOSING THE RIGHT FOOD

Puppies, adult dogs and senior dogs can have different nutritional requirements. Check whether the product is suitable for your dog's specific life stage before purchasing. Dogs with allergies, sensitivities or medical dietary requirements may need a veterinarian-recommended diet.

STORAGE AND CARE

Keep the product sealed between uses and follow the package's storage instructions. Use a clean, dry feeding bowl, and check the packaging for the best-before date and handling guidance.

IMPORTANT INFORMATION

The exact ingredients, protein and fat percentages, nutritional analysis, feeding quantities and suitability for particular life stages must be verified from the manufacturer's packaging. Consult your veterinarian if your dog has a medical condition or requires a specialised diet.`,
    price: 1299,
    stock: 50,
    category: "Dog Food",
    imageUrl:
      "https://images.unsplash.com/photo-1589924691995-400dc9ecc119?auto=format&fit=crop&w=900&q=85",
    isActive: true,
  },
  {
    slug: "puppy-growth-food",
    name: "Puppy Growth Food",
    description: `
WHY CONSIDER THIS PRODUCT?

• Puppy-focused shopping: A convenient category choice when comparing feeding options for young dogs.
• Mealtime consistency: Helps you establish a predictable daily feeding schedule.
• Portion monitoring: Makes it easier to observe your puppy's appetite and adjust feeding according to verified feeding guidance.
• Growth-stage awareness: Encourages you to select food appropriate for your puppy's age and expected adult size.

HOW TO FEED YOUR PUPPY

1. Verify the manufacturer's recommended age range and confirm the food is suitable for your puppy.
2. Check the feeding chart for guidance based on current body weight and age.
3. Follow the recommended transition instructions when introducing this food.
4. Provide fresh drinking water and maintain a consistent feeding routine.
5. Monitor your puppy's appetite, stool consistency and growth, and discuss concerns with your veterinarian.

WHAT TO CONSIDER BEFORE BUYING

Puppies have different nutritional needs from adult dogs. Breed size, growth rate, age and health can affect the appropriate diet. Large-breed puppies may have particular nutritional requirements, so check the product's verified suitability before choosing it.

STORAGE AND HANDLING

Store the food according to the manufacturer's instructions. Keep packaging securely closed, use clean feeding equipment and check the best-before date before serving.

IMPORTANT INFORMATION

The exact formulation, ingredients, calorie content, nutritional adequacy, recommended age range and feeding quantities have not been independently verified for this listing. Do not assume that a product supports a particular growth outcome without supporting manufacturer information. Seek veterinary advice if your puppy has digestive problems, food sensitivities or special dietary requirements.`,
    price: 899,
    stock: 35,
    category: "Dog Food",
    imageUrl:
      "https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=900&q=85",
    isActive: true,
  },
  {
    slug: "premium-cat-food",
    name: "Premium Cat Food",
    description: `
WHY CONSIDER THIS PRODUCT?

• Daily feeding routine: Helps you plan consistent mealtimes for your cat.
• Portion awareness: Makes it easier to monitor the amount offered at each meal.
• Individual needs: Encourages a more thoughtful choice based on your cat's life stage and condition.
• Feeding organisation: Supports a predictable routine for households with one or more cats.

HOW TO SERVE

1. Check the package to determine whether the food is complete, complementary, or intended for a specific feeding purpose.
2. Verify the manufacturer's recommended life stage and feeding instructions.
3. Follow the transition guidance when changing your cat's regular diet.
4. Provide clean, fresh drinking water every day.
5. Keep feeding bowls clean and observe changes in appetite or digestion.

CHOOSING FOOD FOR YOUR CAT

Kittens, adult cats and senior cats may need different nutritional profiles. Indoor activity levels, body condition and health history can also influence feeding decisions. Cats with urinary, kidney, digestive or other medical concerns may require a veterinarian-recommended diet rather than a general-purpose product.

STORAGE AND FRESHNESS

Follow the packaging instructions for storage and serving. Seal the pack properly after use and check the best-before date. If the product is wet food, any opened portion should be handled according to the manufacturer's refrigeration and disposal guidance.

IMPORTANT INFORMATION

The ingredients, protein levels, taurine content, calorie density, moisture content and nutritional adequacy of this particular product have not been verified. Confirm these details on the actual packaging before making a purchase, especially if your cat has a medical or specialised dietary requirement.`,
    price: 749,
    stock: 40,
    category: "Cat Food",
    imageUrl:
      "https://images.unsplash.com/photo-1573865526739-10659fec78a5?auto=format&fit=crop&w=900&q=85",
    isActive: true,
  },
  {
    slug: "interactive-cat-toy",
    name: "Interactive Cat Toy",
    description: `
WHY CONSIDER THIS TOY?

• Playtime variety: Introduces another activity into your cat's everyday routine.
• Curiosity and exploration: Offers an opportunity for cats to investigate and interact with a play object.
• Shared interaction: Can be incorporated into short play sessions with your cat.
• Indoor enrichment: Helps you plan activities for cats that spend most or all of their time indoors.

HOW TO INTRODUCE THE TOY

1. Place the toy in a familiar, comfortable environment.
2. Allow your cat to approach and investigate it at its own pace.
3. Supervise the first few play sessions and observe how your cat interacts with it.
4. Keep sessions appropriate for your cat's age, activity level and temperament.
5. Put the toy away if it becomes damaged or develops loose pieces.

CHOOSING THE RIGHT PLAYTHING

Cats differ in their play preferences. Some enjoy chasing, some prefer batting at objects, and others enjoy exploring unfamiliar textures or shapes. Observe your cat's response instead of assuming every toy will appeal to every cat.

CARE AND SAFETY

Inspect the toy regularly for damage, loose parts, sharp edges or detached components. Clean it according to the verified material and manufacturer instructions. Store it safely when not in use, particularly if it contains small components or strings.

IMPORTANT INFORMATION

The exact design, materials, dimensions, interactive mechanism and age recommendations for this particular toy have not been verified. Do not leave a cat unsupervised with a damaged toy or one containing parts that could be swallowed. This product is intended as a play accessory, not as a substitute for regular care, exercise or veterinary attention.`,
    price: 299,
    stock: 60,
    category: "Cat Toys",
    imageUrl:
      "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=900&q=85",
    isActive: true,
  },
  {
    slug: "durable-dog-chew-toy",
    name: "Durable Dog Chew Toy",
    description: `
WHY CONSIDER THIS TOY?

• Everyday play: Adds another activity to your dog's playtime routine.
• Chewing activity: Provides a designated object for appropriate supervised chewing.
• Interactive routines: Can be incorporated into short sessions with your dog.
• Activity variety: Offers an alternative to rotating through the same play activities every day.

HOW TO USE

1. Inspect the toy before giving it to your dog.
2. Check the manufacturer's size guidance and intended use.
3. Introduce the toy during a supervised play session.
4. Observe how forcefully your dog chews and whether the toy remains intact.
5. Remove the toy immediately if it cracks, breaks, develops sharp edges or loses pieces.

HOW TO CHOOSE A SUITABLE CHEW TOY

Consider your dog's body size, age, jaw strength and chewing habits. A toy that is too small may present a swallowing risk, while an unsuitable material may break under forceful chewing. Ask your veterinarian for guidance if your dog has a history of swallowing non-food objects or damaging toys quickly.

CLEANING AND MAINTENANCE

Follow the manufacturer's cleaning instructions and inspect the toy regularly. Avoid using cleaning agents or heat treatments unless they are confirmed to be suitable for the product's material.

IMPORTANT INFORMATION

The material composition, dimensions, chew-resistance rating and suitability for aggressive chewers have not been verified for this particular item. The word "durable" in the product name should not be treated as a guarantee that the toy is indestructible. Supervise use and replace damaged toys promptly.`,
    price: 399,
    stock: 45,
    category: "Dog Toys",
    imageUrl:
      "https://images.unsplash.com/photo-1535294435445-d7249524ef2e?auto=format&fit=crop&w=900&q=85",
    isActive: true,
  },
  {
    slug: "adjustable-dog-collar",
    name: "Adjustable Dog Collar",
    description: `
WHY CONSIDER THIS ACCESSORY?

• Adjustable fit: Intended to allow fit adjustment within the product's actual size range.
• Everyday use: A practical accessory to consider for regular outings and identification.
• Fit awareness: Encourages you to check your dog's comfort as its coat, size or body condition changes.
• Walking preparation: Can be included in your routine for preparing your dog for outdoor activities.

HOW TO CHECK THE FIT

1. Measure your dog's neck using a flexible measuring tape.
2. Compare the measurement with the manufacturer's stated minimum and maximum collar sizes.
3. Adjust the collar according to the product instructions.
4. Check that the collar is secure without being excessively tight.
5. Inspect the buckle, fastening and attachment points before each walk.

CHOOSING THE RIGHT COLLAR

Dogs vary in neck size, coat thickness and pulling behaviour. Check the actual collar dimensions, fastening design and material before purchasing. A collar should not restrict breathing, cause rubbing or interfere with normal movement. For dogs that pull strongly or have specific neck or breathing concerns, ask your veterinarian or a qualified trainer about appropriate walking equipment.

CARE AND MAINTENANCE

Inspect the collar regularly for fraying, loose stitching, damaged buckles or weakened attachment points. Clean and dry it according to the verified material-care instructions.

IMPORTANT INFORMATION

The collar's exact material, size range, buckle strength, load rating and water resistance have not been verified. Do not assume that an adjustable collar fits every dog or is suitable for vehicle restraint. Ensure the fit remains comfortable and replace worn or damaged equipment.`,
    price: 349,
    stock: 30,
    category: "Accessories",
    imageUrl:
      "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&w=900&q=85",
    isActive: true,
  },
  {
    slug: "cozy-pet-bed",
    name: "Cozy Pet Bed",
    description: `
WHY CONSIDER THIS PRODUCT?

• Dedicated resting space: Gives your pet a specific place to settle down.
• Home comfort: Helps establish a familiar resting area away from busy walkways.
• Everyday routine: Can become part of your pet's regular relaxation and sleep routine.
• Placement flexibility: Choose a location that suits your pet's habits and your household layout.

HOW TO INTRODUCE THE BED

1. Measure your pet while it is resting in its usual sleeping position.
2. Compare those measurements with the actual bed dimensions.
3. Place the bed on a stable, dry surface in a comfortable location.
4. Introduce it gradually and allow your pet to explore it voluntarily.
5. Observe whether your pet can lie down, turn around and get up comfortably.

CHOOSING THE RIGHT SIZE

Consider your pet's body length, sleeping position and preference for stretching out or curling up. Puppies may grow quickly, so account for expected size changes. Senior pets or animals with mobility concerns may need particular attention to bed height, stability and ease of access.

CLEANING AND CARE

Check whether the cover is removable and whether the manufacturer permits machine washing. Follow the verified care label, dry the bed thoroughly and inspect seams and filling regularly. Replace damaged bedding if loose filling or small components become accessible.

IMPORTANT INFORMATION

The bed's dimensions, filling material, fabric composition, removable-cover status, washability and support characteristics have not been verified for this listing. Do not assume the product is orthopedic, waterproof, hypoallergenic or suitable for a particular medical condition without manufacturer documentation.`,
    price: 1599,
    stock: 20,
    category: "Pet Bedding",
    imageUrl:
      "https://images.unsplash.com/photo-1541599540903-216a46ca1dc0?auto=format&fit=crop&w=900&q=85",
    isActive: true,
  },
  {
    slug: "stainless-steel-pet-bowl",
    name: "Stainless Steel Pet Bowl",
    description: `Keep your pet's daily feeding setup organised with the Stainless Steel Pet Bowl. A dedicated bowl can be used as part of a regular feeding or watering routine, with the appropriate size and placement chosen according to your pet's needs.

WHY CONSIDER THIS PRODUCT?

• Everyday feeding: A practical item for serving your pet's meals.
• Water access: Can be used for drinking water if suitable for that purpose.
• Dedicated feeding area: Helps establish a consistent place for meals.
• Routine cleaning: Makes regular bowl hygiene part of your pet-care schedule.

HOW TO USE

1. Confirm the bowl's dimensions and capacity before choosing it.
2. Place it on a stable, clean surface where your pet can reach it comfortably.
3. Serve food or water appropriate for your pet.
4. Remove leftover food and wash the bowl regularly.
5. Refill drinking water with fresh water and clean the bowl as needed throughout the day.

CHOOSING THE RIGHT SIZE

A suitable bowl should provide enough room for your pet to eat or drink comfortably without making the feeding position awkward. Consider your pet's breed, size, eating habits and whether the bowl will be used for food, water or both at different times.

CLEANING AND MAINTENANCE

Follow the manufacturer's cleaning and dishwasher guidance, if provided. Inspect the rim and base for sharp edges, dents, corrosion or other damage. Place the bowl securely to reduce unwanted movement while your pet is eating.

IMPORTANT INFORMATION

The bowl's exact capacity, dimensions, steel grade, base design, dishwasher compatibility and non-slip features have not been verified. Although the listing identifies the product as stainless steel, the precise material specification should be confirmed with the manufacturer. Replace a damaged bowl if its edges or structure become unsafe for your pet.`,
    price: 249,
    stock: 55,
    category: "Accessories",
    imageUrl:
      "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&w=900&q=85",
    isActive: true,
  },

  {
    slug: "adult-dog-chicken-food",
    name: "Adult Dog Chicken Food",
    description: `WHY CONSIDER THIS PRODUCT?

• Everyday feeding: An additional option to compare when planning your adult dog's regular meals.
• Routine friendly: Can be incorporated into a consistent feeding schedule.
• Portion awareness: Follow the feeding guidance printed on the actual package.
• Individual needs: Choose according to your dog's age, size, activity and health requirements.

HOW TO USE

1. Check the package for ingredients, nutritional information and life-stage suitability.
2. Follow the manufacturer's feeding chart for your dog's weight.
3. Introduce dietary changes gradually, following veterinary or package guidance.
4. Keep fresh drinking water available.
5. Monitor appetite and digestion after introducing a new food.

IMPORTANT INFORMATION

The exact ingredients, nutritional analysis and suitability of this product have not been independently verified. Confirm all details on the manufacturer's packaging before feeding.`,
    price: 1099,
    stock: 32,
    category: "Dog Food",
    imageUrl: "https://images.unsplash.com/photo-1589924691995-400dc9ecc119?auto=format&fit=crop&w=900&q=85",
    isActive: true,
  },
  {
    slug: "senior-dog-food",
    name: "Senior Dog Food",
    description: `WHY CONSIDER THIS PRODUCT?

• Senior-dog shopping: An option to compare when looking for food intended for older dogs.
• Feeding routine: Helps organise regular mealtimes.
• Portion monitoring: Makes it easier to keep track of daily food portions.
• Individual needs: Older dogs may have specific nutritional or medical requirements.

HOW TO USE

1. Verify the manufacturer's stated age range and nutritional suitability.
2. Review the feeding instructions and serving guidance on the package.
3. Transition gradually according to the manufacturer's instructions.
4. Provide fresh drinking water.
5. Consult your veterinarian if your dog has age-related health or dietary concerns.

IMPORTANT INFORMATION

The formulation, ingredients and suitability for senior dogs have not been independently verified. Check the packaging and seek veterinary advice before choosing a specialised diet.`,
    price: 1399,
    stock: 24,
    category: "Dog Food",
    imageUrl: "https://images.unsplash.com/photo-1551717743-49959800b1f6?auto=format&fit=crop&w=900&q=85",
    isActive: true,
  },
  {
    slug: "kitten-growth-food",
    name: "Kitten Growth Food",
    description: `WHY CONSIDER THIS PRODUCT?

• Kitten-focused shopping: An option to compare when planning meals for a young cat.
• Mealtime routine: Helps establish consistent feeding times.
• Portion awareness: Follow the package guidance for your kitten's age and weight.
• Life-stage awareness: Kittens have different nutritional needs from adult cats.

HOW TO SERVE

1. Confirm the manufacturer's recommended age range.
2. Check whether the food is complete and balanced for kittens.
3. Follow the feeding chart and transition instructions on the package.
4. Provide clean, fresh drinking water.
5. Monitor appetite and digestion.

IMPORTANT INFORMATION

The ingredients, nutritional analysis and suitability for kittens have not been independently verified. Confirm the details on the actual packaging and ask your veterinarian if your kitten has special dietary needs.`,
    price: 799,
    stock: 28,
    category: "Cat Food",
    imageUrl: "https://images.unsplash.com/photo-1519052537078-e6302a4968d4?auto=format&fit=crop&w=900&q=85",
    isActive: true,
  },
  {
    slug: "dog-rope-chew-toy",
    name: "Dog Rope Chew Toy",
    description: `WHY CONSIDER THIS TOY?

• Playtime variety: Adds another option to your dog's everyday play routine.
• Interactive play: Can be used for supervised games with your dog.
• Chewing activity: Offers a designated play object when used appropriately.
• Routine enrichment: Helps introduce variety into regular play sessions.

HOW TO USE

1. Check the toy for damage before each use.
2. Choose a size appropriate for your dog's build.
3. Supervise play, especially when first introducing the toy.
4. Remove it if threads become loose or pieces detach.
5. Clean it only according to the manufacturer's care instructions.

IMPORTANT INFORMATION

The material, dimensions and suitability for different chewing styles have not been verified. Supervise use and remove damaged toys promptly to reduce swallowing and choking risks.`,
    price: 249,
    stock: 42,
    category: "Dog Toys",
    imageUrl: "https://images.unsplash.com/photo-1535294435445-d7249524ef2e?auto=format&fit=crop&w=900&q=85",
    isActive: true,
  },
  {
    slug: "dog-fetch-ball",
    name: "Dog Fetch Ball",
    description: `WHY CONSIDER THIS TOY?

• Active play: An option for supervised fetch and movement-based games.
• Playtime variety: Helps vary your dog's usual activities.
• Shared interaction: Can be incorporated into short play sessions.
• Outdoor activities: Consider it for suitable play areas and conditions.

HOW TO USE

1. Check the ball's size and material before purchase.
2. Introduce it during a supervised play session.
3. Choose a safe area away from traffic and other hazards.
4. Inspect it regularly for cracks, tears or loose pieces.
5. Remove it if damaged.

IMPORTANT INFORMATION

The ball's exact dimensions, material and chew resistance have not been verified. Select a suitable size and supervise play, particularly with dogs that chew or swallow toys.`,
    price: 199,
    stock: 50,
    category: "Dog Toys",
    imageUrl: "https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?auto=format&fit=crop&w=900&q=85",
    isActive: true,
  },
  {
    slug: "cat-feather-teaser-toy",
    name: "Cat Feather Teaser Toy",
    description: `WHY CONSIDER THIS TOY?

• Interactive play: An option for shared play sessions with your cat.
• Curiosity and movement: Encourages your cat to follow and investigate a moving toy.
• Indoor enrichment: Can add variety to an indoor cat's activity routine.
• Playtime bonding: Offers an opportunity for positive interaction.

HOW TO USE

1. Introduce the toy in a familiar space.
2. Move it gently and allow your cat to engage at its own pace.
3. Keep play sessions supervised.
4. Store it safely after use.
5. Check regularly for loose feathers, strings or damaged components.

IMPORTANT INFORMATION

The materials, dimensions and construction have not been verified. Do not leave cats unattended with string or detachable components, and remove the toy if damaged.`,
    price: 179,
    stock: 38,
    category: "Cat Toys",
    imageUrl: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=900&q=85",
    isActive: true,
  },
  {
    slug: "adjustable-pet-harness",
    name: "Adjustable Pet Harness",
    description: `WHY CONSIDER THIS ACCESSORY?

• Walking equipment: An accessory to compare when preparing for outdoor walks.
• Adjustable design: Intended to allow fit changes within its actual size range.
• Fit awareness: Encourages careful measurement before purchase.
• Everyday outings: Can be paired with compatible walking equipment.

HOW TO CHECK THE FIT

1. Measure your pet according to the manufacturer's sizing guide.
2. Compare the measurements with the product's size chart.
3. Adjust all straps as instructed.
4. Check that the harness does not restrict normal movement or breathing.
5. Inspect buckles, stitching and attachment points before use.

IMPORTANT INFORMATION

The material, size range, fastening strength and fit characteristics have not been verified. Confirm the manufacturer's specifications and supervise your pet while getting used to new walking equipment.`,
    price: 499,
    stock: 26,
    category: "Accessories",
    imageUrl: "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?auto=format&fit=crop&w=900&q=85",
    isActive: true,
  },
  {
    slug: "pet-travel-water-bottle",
    name: "Pet Travel Water Bottle",
    description: `WHY CONSIDER THIS ACCESSORY?

• Travel preparation: An accessory to consider when organising outings with your pet.
• Water access: Intended to make carrying drinking water more convenient.
• Everyday outings: Can be included in walks and suitable trips.
• Routine planning: Encourages you to plan for your pet's hydration needs.

HOW TO USE

1. Check the bottle's capacity and operating instructions.
2. Fill it with clean drinking water before leaving.
3. Offer water regularly during outings.
4. Clean and dry it according to the manufacturer's guidance.
5. Check the lid and seals for leaks before carrying it.

IMPORTANT INFORMATION

The capacity, material, leak resistance and cleaning compatibility have not been verified. Confirm these details with the manufacturer before use.`,
    price: 399,
    stock: 34,
    category: "Accessories",
    imageUrl: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=900&q=85",
    isActive: true,
  },
  {
    slug: "pet-walking-leash",
    name: "Everyday Pet Walking Leash",
    description: `WHY CONSIDER THIS ACCESSORY?

• Walking routine: An everyday accessory to consider for supervised outings.
• Handling: Provides a connection point between compatible walking equipment and the handler.
• Outdoor preparation: Can be included in your regular walk checklist.
• Fit compatibility: Encourages checking that the leash works with your pet's collar or harness.

HOW TO USE

1. Check the leash length and material specifications.
2. Attach it to a compatible, properly fitted collar or harness.
3. Inspect the clasp and stitching before each walk.
4. Keep your pet under control in public spaces.
5. Replace the leash if the clasp, stitching or material becomes damaged.

IMPORTANT INFORMATION

The leash length, material, clasp strength and load rating have not been verified. Choose equipment appropriate for your pet and supervise outdoor use.`,
    price: 299,
    stock: 40,
    category: "Accessories",
    imageUrl: "https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=900&q=85",
    isActive: true,
  },
  {
    slug: "soft-cushion-pet-bed",
    name: "Soft Cushion Pet Bed",
    description: `WHY CONSIDER THIS PRODUCT?

• Resting space: An additional option for creating a comfortable place for your pet.
• Home routine: Helps establish a familiar spot for relaxation.
• Placement flexibility: Can be placed in a suitable, quiet area of your home.
• Size awareness: Encourages checking the dimensions against your pet's resting position.

HOW TO INTRODUCE THE BED

1. Measure your pet while resting in its usual sleeping position.
2. Compare the measurements with the product dimensions.
3. Place the bed on a stable, dry surface.
4. Allow your pet to explore it at its own pace.
5. Check the bed regularly for damage or loose filling.

IMPORTANT INFORMATION

The dimensions, fabric, filling, washability and support characteristics have not been verified. Check the manufacturer's product details and care label before purchase.`,
    price: 1199,
    stock: 18,
    category: "Pet Bedding",
    imageUrl: "https://images.unsplash.com/photo-1541599540903-216a46ca1dc0?auto=format&fit=crop&w=900&q=85",
    isActive: true,
  },
];
async function main() {
  for (const product of products) {
    await prisma.product.upsert({
      where: { slug: product.slug },
      update: {
        name: product.name,
        description: product.description,
        price: product.price,
        stock: product.stock,
        category: product.category,
        imageUrl: product.imageUrl,
        isActive: product.isActive,
      },
      create: product,
    });
  }

  console.log(`Successfully seeded ${products.length} products.`);
}

main()
  .catch((error) => {
    console.error("Seeding failed:", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });
