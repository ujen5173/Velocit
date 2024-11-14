# 🏍️ Velocit - Modern Vehicle Rental Platform 🚲

A full-stack vehicle rental platform that connects vendors and customers, automating the entire rental process from booking to return. The platform supports multiple vehicle types and provides real-time location-based services.

## ✨ Features

- **Multi-vendor Platform**

  - Vendors can create and manage their rental shops
  - Complete inventory management system
  - Real-time booking tracking
  - Analytics dashboard

- **Customer Features**
  - Location-based shop discovery
  - Multiple vehicle categories (Cycles, E-cycles, Bikes, E-bikes, Cars)
  - Seamless booking process
  - Secure payment integration
  - Real-time vehicle tracking
  - Rating and review system

## 🛠️ Tech Stack

- [Next.js 14](https://nextjs.org/)
- [shadcn/ui](https://ui.shadcn.com/)
- [TailwindCSS](https://tailwindcss.com/)
- [tRPC](https://trpc.io/)
- [Drizzle ORM](https://orm.drizzle.team/)
- [PostgreSQL](https://www.postgresql.org/)
- [NextAuth.js](https://next-auth.js.org/)
- [UploadThing](https://uploadthing.com/)
- [Google Maps API](https://developers.google.com/maps)

## 📝 Prerequisites

- Node.js 18+
- PostgreSQL
- Google Maps API key
- UploadThing account
- bun

## 🚀 Getting Started

1. **Clone the repository**

```bash
git clone https://github.com/ujen5173/velocit.git
cd Velocit
```

2. **Install dependencies**

```bash
bun install
```

3. **Set up environment variables**

```bash
cp .env.example .env
```

4. **Set up the database**

```bash
bun db:push
```

5. **Setup supabase triggers**

```bash
CREATE OR REPLACE FUNCTION add_business_on_user_creation()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.role = 'VENDOR' THEN
    INSERT INTO business (owner_id)
    VALUES (NEW.id);

  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_add_business_on_user_creation
AFTER INSERT ON "user"
FOR EACH ROW
EXECUTE FUNCTION add_business_on_user_creation();
```

6. **Script to RSL enabled for all tables**

```bash
DO
$$
DECLARE
    tbl RECORD;
BEGIN
    -- Loop through each table in the public schema
    FOR tbl IN
        SELECT tablename
        FROM pg_tables
        WHERE schemaname = 'public'
    LOOP
        -- Enable RLS on each table
        EXECUTE 'ALTER TABLE public.' || tbl.tablename || ' ENABLE ROW LEVEL SECURITY;';
    END LOOP;
END;
$$;
```

7. **Run the development server**

```bash
bun dev
```

Open [http://localhost:3000](http://localhost:3000) to see the application.

## 🤝 Contributing

We love your input! We want to make contributing to Velocit as easy and transparent as possible. Please follow these steps:

1. Fork the repo and create your branch from `main`.

   ```bash
   git checkout -b feature/AmazingFeature
   ```

2. Commit your changes following [Conventional Commits](https://www.conventionalcommits.org/):

   ```bash
   git commit -m "feat: add amazing feature"
   ```

3. Push to your branch:

   ```bash
   git push origin feature/AmazingFeature
   ```

4. Open a Pull Request!

### Contribution Guidelines

- Follow the existing code style and conventions
- Write clear, descriptive commit messages
- Update documentation as needed
- Ensure your PR solves a specific issue or adds value

## 📞 Get in touch

For contact, email ujenbasi1122@gmail.com.

---

Made with ❤️ for a change in society.
