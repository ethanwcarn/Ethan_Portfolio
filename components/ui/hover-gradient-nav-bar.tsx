'use client'
import React from 'react';
import { motion, Variants } from 'framer-motion';
import {
  Home,
  Settings,
  Bell,
  User,
  Mail,
  BarChart3,
  HelpCircle,
  LogOut,
  BriefcaseBusiness,
  FolderOpen,
  FileText,
} from 'lucide-react';

interface HoverGradientMenuItem {
  icon: React.ReactNode;
  label: string;
  href: string;
  gradient: string;
  iconColor: string;
}

const defaultMenuItems: HoverGradientMenuItem[] = [
  { icon: <Home className="h-5 w-5" />, label: "Home", href: "#", gradient: "radial-gradient(circle, rgba(59,130,246,0.15) 0%, rgba(37,99,235,0.06) 50%, rgba(29,78,216,0) 100%)", iconColor: "group-hover:text-blue-500 dark:group-hover:text-blue-400" },
  { icon: <Bell className="h-5 w-5" />, label: "Notifications", href: "#", gradient: "radial-gradient(circle, rgba(249,115,22,0.15) 0%, rgba(234,88,12,0.06) 50%, rgba(194,65,12,0) 100%)", iconColor: "group-hover:text-orange-500 dark:group-hover:text-orange-400" },
  { icon: <Mail className="h-5 w-5" />, label: "Messages", href: "#", gradient: "radial-gradient(circle, rgba(147,51,234,0.15) 0%, rgba(126,34,206,0.06) 50%, rgba(88,28,135,0) 100%)", iconColor: "group-hover:text-purple-500 dark:group-hover:text-purple-400" },
  { icon: <BarChart3 className="h-5 w-5" />, label: "Analytics", href: "#", gradient: "radial-gradient(circle, rgba(34,197,94,0.15) 0%, rgba(22,163,74,0.06) 50%, rgba(21,128,61,0) 100%)", iconColor: "group-hover:text-green-500 dark:group-hover:text-green-400" },
  { icon: <Settings className="h-5 w-5" />, label: "Settings", href: "#", gradient: "radial-gradient(circle, rgba(59,130,246,0.15) 0%, rgba(37,99,235,0.06) 50%, rgba(29,78,216,0) 100%)", iconColor: "group-hover:text-blue-500 dark:group-hover:text-blue-400" },
  { icon: <User className="h-5 w-5" />, label: "Profile", href: "#", gradient: "radial-gradient(circle, rgba(239,68,68,0.15) 0%, rgba(220,38,38,0.06) 50%, rgba(185,28,28,0) 100%)", iconColor: "group-hover:text-red-500 dark:group-hover:text-red-400" },
  { icon: <HelpCircle className="h-5 w-5" />, label: "Help", href: "#", gradient: "radial-gradient(circle, rgba(20,184,166,0.15) 0%, rgba(13,148,136,0.06) 50%, rgba(15,118,110,0) 100%)", iconColor: "group-hover:text-teal-500 dark:group-hover:text-teal-400" },
  { icon: <LogOut className="h-5 w-5" />, label: "Logout", href: "#", gradient: "radial-gradient(circle, rgba(161,98,7,0.15) 0%, rgba(133,77,14,0.06) 50%, rgba(100,62,8,0) 100%)", iconColor: "group-hover:text-amber-600 dark:group-hover:text-amber-400" },
];

const portfolioMenuItems: HoverGradientMenuItem[] = [
  {
    icon: <User className="h-5 w-5" />,
    label: "About",
    href: "#about",
    gradient:
      "radial-gradient(circle, rgba(59,130,246,0.15) 0%, rgba(37,99,235,0.06) 50%, rgba(29,78,216,0) 100%)",
    iconColor: "group-hover:text-blue-500",
  },
  {
    icon: <BriefcaseBusiness className="h-5 w-5" />,
    label: "Experience",
    href: "#experience",
    gradient:
      "radial-gradient(circle, rgba(34,197,94,0.15) 0%, rgba(22,163,74,0.06) 50%, rgba(21,128,61,0) 100%)",
    iconColor: "group-hover:text-green-500",
  },
  {
    icon: <FolderOpen className="h-5 w-5" />,
    label: "Projects",
    href: "#projects",
    gradient:
      "radial-gradient(circle, rgba(147,51,234,0.15) 0%, rgba(126,34,206,0.06) 50%, rgba(88,28,135,0) 100%)",
    iconColor: "group-hover:text-purple-500",
  },
  {
    icon: <Mail className="h-5 w-5" />,
    label: "Contact",
    href: "#contact",
    gradient:
      "radial-gradient(circle, rgba(20,184,166,0.15) 0%, rgba(13,148,136,0.06) 50%, rgba(15,118,110,0) 100%)",
    iconColor: "group-hover:text-teal-500",
  },
  {
    icon: <FileText className="h-5 w-5" />,
    label: "Resume",
    href: "#",
    gradient:
      "radial-gradient(circle, rgba(161,98,7,0.15) 0%, rgba(133,77,14,0.06) 50%, rgba(100,62,8,0) 100%)",
    iconColor: "group-hover:text-amber-600",
  },
];

const itemVariants: Variants = {
  initial: { rotateX: 0, opacity: 1 },
  hover: { rotateX: -90, opacity: 0 },
};

const backVariants: Variants = {
  initial: { rotateX: 90, opacity: 0 },
  hover: { rotateX: 0, opacity: 1 },
};

const glowVariants: Variants = {
  initial: { opacity: 0, scale: 0.8 },
  hover: {
    opacity: 1,
    scale: 2,
    transition: {
      opacity: { duration: 0.5, ease: [0.4, 0, 0.2, 1] },
      scale: { duration: 0.5, type: "spring", stiffness: 300, damping: 25 },
    },
  },
};

const sharedTransition = {
  type: "spring" as const,
  stiffness: 100,
  damping: 20,
  duration: 0.5,
};

interface HoverGradientNavBarProps {
  items?: HoverGradientMenuItem[];
  mode?: 'floating' | 'inline';
  preset?: 'default' | 'portfolio';
}

function HoverGradientNavBar({
  items,
  mode = 'floating',
  preset = 'default',
}: HoverGradientNavBarProps): React.JSX.Element {
  const resolvedItems = items ?? (preset === 'portfolio' ? portfolioMenuItems : defaultMenuItems);

  const wrapperClass =
    mode === 'inline'
      ? 'w-fit'
      : 'fixed bottom-0 left-0 w-full md:bottom-4 md:left-1/2 md:-translate-x-1/2 z-50';

  const navClass =
    mode === 'inline'
      ? 'w-fit mx-auto px-2 py-2 rounded-3xl bg-white/90 backdrop-blur-lg border border-gray-200/80 shadow-lg relative'
      : 'w-full md:w-fit mx-auto px-2 md:px-4 py-2 md:py-3 rounded-none md:rounded-3xl bg-white/90 dark:bg-black/80 backdrop-blur-lg border-t md:border border-gray-200/80 dark:border-gray-800/80 shadow-lg md:shadow-xl relative';

  return (
    <div className={wrapperClass}>
      <motion.nav
        className={navClass}
        initial="initial"
        whileHover="hover"
      >
        <ul className="relative z-10 flex items-center justify-around gap-1 md:justify-center md:gap-3">
          {resolvedItems.map((item: HoverGradientMenuItem) => (
            <motion.li key={item.label} className="relative flex-1 md:flex-none">
              <motion.div
                className="group relative block overflow-visible rounded-xl md:rounded-2xl"
                style={{ perspective: "600px" }}
                whileHover="hover"
                initial="initial"
              >
                <motion.div
                  className="pointer-events-none absolute inset-0 z-0 rounded-xl md:rounded-2xl"
                  variants={glowVariants}
                  style={{
                    background: item.gradient,
                    opacity: 0,
                  }}
                />
                <motion.a
                  href={item.href}
                  className="relative z-10 flex flex-col items-center justify-center gap-0.5 rounded-xl bg-transparent px-2 py-1.5 text-xs text-gray-600 transition-colors group-hover:text-gray-900 md:flex-row md:gap-2 md:rounded-2xl md:px-4 md:py-2 md:text-sm"
                  variants={itemVariants}
                  transition={sharedTransition}
                  style={{
                    transformStyle: "preserve-3d",
                    transformOrigin: "center bottom"
                  }}
                >
                  <span className={`transition-colors duration-300 ${item.iconColor}`}>
                    {item.icon}
                  </span>
                  <span className="hidden font-medium md:inline">{item.label}</span>
                </motion.a>
                <motion.a
                  href={item.href}
                  className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-0.5 rounded-xl bg-transparent px-2 py-1.5 text-xs text-gray-600 transition-colors group-hover:text-gray-900 md:flex-row md:gap-2 md:rounded-2xl md:px-4 md:py-2 md:text-sm"
                  variants={backVariants}
                  transition={sharedTransition}
                  style={{
                    transformStyle: "preserve-3d",
                    transformOrigin: "center top",
                    transform: "rotateX(90deg)"
                  }}
                >
                  <span className={`transition-colors duration-300 ${item.iconColor}`}>
                    {item.icon}
                  </span>
                  <span className="hidden font-medium md:inline">{item.label}</span>
                </motion.a>
              </motion.div>
            </motion.li>
          ))}
        </ul>
      </motion.nav>
    </div>
  );
}

export default HoverGradientNavBar;
