import { motion } from 'framer-motion'
import Navbar from '../Navbar/Navbar'
import Footer from '../Footer/Footer'
import BackToTop from '../BackToTop/BackToTop'
import WhatsAppButton from '../WhatsAppButton/WhatsAppButton'

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.3 } },
}

const Layout = ({ children, hideFooter = false }) => (
  <>
    <Navbar />
    <motion.main
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="min-h-screen pt-20"
    >
      {children}
    </motion.main>
    {!hideFooter && <Footer />}
    <BackToTop />
    <WhatsAppButton />
  </>
)

export default Layout
