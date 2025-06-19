# CRYS TECH Employee Management Dashboard

A premium employee management dashboard built with Node.js, Express, React, MongoDB, and GSAP animations.

## Features

- **Employee Registration**: Complete form with validation for all employee details
- **MongoDB Integration**: Persistent data storage with MongoDB Atlas
- **PDF Generation**: Download individual profiles or complete employee directory
- **GSAP Animations**: Smooth, professional animations throughout the interface
- **Modern UI**: Glass morphism design with #56DFCF theme
- **Responsive Design**: Works seamlessly across desktop and mobile devices

## Tech Stack

- **Backend**: Node.js, Express, MongoDB, Mongoose
- **Frontend**: React, TypeScript, Tailwind CSS
- **Animations**: GSAP (GreenSock Animation Platform)
- **PDF Generation**: jsPDF with autoTable
- **Database**: MongoDB Atlas
- **Build Tool**: Vite

## Installation

1. Clone the repository:
```bash
git clone https://github.com/Anbu-terminator/Employe.git
cd Employe
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5000`

## Deployment

### Build for Production
```bash
npm run build
```

### Start Production Server
```bash
npm start
```

## Environment Variables

The MongoDB connection string is configured in the application. For production deployment, ensure your MongoDB Atlas cluster allows connections from your deployment platform.

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run check` - Type checking

## License

MIT License