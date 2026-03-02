import Navbar from '@/components/Navbar'
import Header from '../components/Header'
import ImageSlider from '@/components/ImageSlider'
import InfoSection from '@/components/InfoSection'
import Cards from '@/components/Cards'
import About from '@/components/About'
import Ads from '@/components/Ads'
import Artical from '@/components/Artical'
import NewsLetter from '@/components/NewsLetter'
import Footer from '@/components/Footer'
import Arrivals from '@/components/Arrivals'


const Home = () => {
  return (
    <div className="w-full">
      <ImageSlider/>
      <InfoSection/>
      <Cards/>
      <Arrivals/>
      <About/>
      <Ads/>
      <Artical/>
      
    </div>
  )
}

export default Home