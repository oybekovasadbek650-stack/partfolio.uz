import {
  SiHtml5, SiCss, SiJavascript, SiReact, SiReactrouter, SiNextdotjs,
  SiSass, SiGit, SiGithub, SiVite, SiVercel,
} from 'react-icons/si'
import { IoPhonePortraitOutline, IoCodeSlashOutline } from 'react-icons/io5'

// ⬇️ Ko'nikmalarni shu yerdan qo'shish yoki o'chirish mumkin
// Guruh sarlavhalari va izohlari — translations.js dagi skills.groups (shu tartibda)
export const GROUPS = [
  {
    skills: [
      { name: 'HTML5', icon: SiHtml5 },
      { name: 'CSS3', icon: SiCss },
      { name: 'JavaScript', icon: SiJavascript },
    ],
  },
  {
    skills: [
      { name: 'React', icon: SiReact },
      { name: 'React Router', icon: SiReactrouter },
      { name: 'Next.js', icon: SiNextdotjs },
    ],
  },
  {
    skills: [
      { name: 'SCSS / Sass', icon: SiSass },
      { name: 'CSS Modules', icon: IoCodeSlashOutline },
      { name: 'responsive', icon: IoPhonePortraitOutline },
    ],
  },
  {
    skills: [
      { name: 'Git', icon: SiGit },
      { name: 'GitHub', icon: SiGithub },
      { name: 'Vite', icon: SiVite },
      { name: 'Vercel', icon: SiVercel },
    ],
  },
]

// Bosh sahifadagi "texnologiya" soni shu yerdan olinadi
export const SKILL_COUNT = GROUPS.reduce((sum, g) => sum + g.skills.length, 0)
