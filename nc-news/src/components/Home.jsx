import myImage from '../assets/NC News.jpeg'

const Home = ()=>{
  return (
    <div>
      <img 
        src={myImage} 
        alt="Two people with dreadlocks are reading a newspaper"
        style={{ width: '50%', height: 'auto' }}
      />
      <section>
        <h2>Welcome to NC News!</h2>
      </section>
    </div>
  );
}

export default Home;

