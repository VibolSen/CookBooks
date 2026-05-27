# CookBook

A premium, modern recipe management platform built with Next.js 15, focusing on a vibrant community of chefs and food enthusiasts.

## 🚀 Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **Database**: [MongoDB](https://www.mongodb.com/) via [Prisma ORM](https://www.prisma.io/)
- **Authentication**: [NextAuth.js](https://next-auth.js.org/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/), [Framer Motion](https://www.framer.com/motion/)
- **Image Hosting**: [Cloudinary](https://cloudinary.com/)
- **Icons**: [Lucide React](https://lucide.dev/), [FontAwesome](https://fontawesome.com/)
- **UI Components**: Radix UI, Material UI (MUI)

## Key Features

- **Recipe Discovery**: Browse popular creations and recipes of the week.
- **Categorization**: filter by diet, occasion, or cuisine.
- **User Profiles**: Manage your own culinary works and favorites.
- **Community Interaction**: Rate and review recipes from other chefs.
- **Image Support**: Multiple high-quality images per recipe via Cloudinary.
- **Admin Dashboard**: Full control over content management.
- **Responsive Design**: Optimized for both mobile and desktop experiences.

## 🛠️ Getting Started

### Prerequisites

- Node.js 18+ 
- MongoDB Instance (Atlas or Local)
- Cloudinary Account

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/VibolSen/CookBooks.git
   cd CookBooks
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Environment Setup:**
   Create a `.env` file in the root directory and add the following:
   ```env
   # Database
   MONGODB_URI="mongodb+srv://..."

   # NextAuth
   NEXTAUTH_URL="http://localhost:3000"
   NEXTAUTH_SECRET="your-secret"

   # Cloudinary
   CLOUDINARY_CLOUD_NAME="your-cloud-name"
   CLOUDINARY_API_KEY="your-api-key"
   CLOUDINARY_API_SECRET="your-api-secret"

   # Auth Providers (Optional)
   GOOGLE_CLIENT_ID="..."
   GOOGLE_CLIENT_SECRET="..."
   ```

4. **Prisma Setup:**
   ```bash
   npx prisma generate
   ```

5. **Run Development Server:**
   ```bash
   npm run dev
   ```

## 📂 Project Structure

- `/app`: Next.js App Router (Pages, Layouts, API)
- `/app/actions`: Server Actions for database operations
- `/app/components`: Reusable UI components
- `/app/lib`: Shared utilities (Prisma client, Auth options)
- `/prisma`: Database schema definition
- `/public`: Static assets (Logos, Placeholders)

## 📜 License

Distributed under the MIT License.
