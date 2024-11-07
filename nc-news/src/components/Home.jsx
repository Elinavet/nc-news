import myImage from '../assets/NC News.jpeg'

const Home = ()=>{
  return (
    <div className='home-page'>
      <img id='img-home'
        src={myImage} 
        alt="Two people with dreadlocks are reading a newspaper"
        // style={{ width: '50%', height: 'auto' }}
      />
    </div>
  );
}

export default Home;

