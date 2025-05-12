import { Link, useParams } from "react-router-dom";

const AllCategories = () => {
    const { category } = useParams();

  return (
    <>
      {category === "politics" && (
        <div className="all-categories-container">
          <Link to={"/politics?subcategory=ap"} className="categorie-box">
            <img
              src="https://jswtv.tv/wp-content/uploads/2022/07/YS-Jagan-hits-it-out-against-Pawan-Kalyan-Chandrababu.jpg"
              alt="category-img"
            />
            <h3 className="category-title text-capital">Andhra</h3>
          </Link>
          <Link to={"/politics?subcategory=ts"} className="categorie-box">
            <img
              src="https://cdn.siasat.com/wp-content/uploads/2023/12/Untitled-design-2023-12-16T214309.488.jpg"
              alt="category-img"
            />
            <h3 className="category-title text-capital">Telangana</h3>
          </Link>
          <Link to={"/politics?subcategory=national"} className="categorie-box">
            <img
              src="https://c.ndtvimg.com/gws/ms/10-politicians-who-will-drive-the-narrative-in-2024-elections/assets/1.jpeg?1711777573"
              alt="category-img"
            />
            <h3 className="category-title text-capital">National</h3>
          </Link>
          <Link
            to={"/politics?subcategory=international"}
            className="categorie-box"
          >
            <img
              src="https://i.ndtvimg.com/i/2018-04/pm-modi-xi-jinping-pti_650x400_71524879810.jpg"
              alt="category-img"
            />
            <h3 className="category-title text-capital">International</h3>
          </Link>
        </div>
      )}

      {category === "movies" && (
        <div className="all-categories-container">
          <Link to={"/movies?subcategory=tollywood"} className="categorie-box">
            <img
              src="https://magicalassam.com/wp-content/uploads/2022/04/Superstars-of-the-South-Charge-Per-Film.jpg"
              alt="category-img"
            />
            <h3 className="category-title text-capital">tollywood</h3>
          </Link>
          <Link to={"/movies?subcategory=bollywood"} className="categorie-box">
            <img
              src="https://imgeng.jagran.com/images/2023/may/Not%20Salman%20Ranbir%20Kapoor%20to%20star%20in%20Aamir%20Khan%20film1685423743863.jpg"
              alt="category-img"
            />
            <h3 className="category-title text-capital">bollywood</h3>
          </Link>
          <Link to={"/movies?subcategory=hollywood"} className="categorie-box">
            <img
              src="https://assets.entrepreneur.com/content/3x2/2000/20160809061411-Avengers.jpeg"
              alt="category-img"
            />
            <h3 className="category-title text-capital">hollywood</h3>
          </Link>
          <Link to={"/movies?subcategory=south"} className="categorie-box">
            <img
              src="https://webbspy.com/wp-content/uploads/2021/08/Kollywood-Actors.png"
              alt="category-img"
            />
            <h3 className="category-title text-capital">south</h3>
          </Link>
          <Link to={"/movies?subcategory=north"} className="categorie-box">
            <img
              src="https://sm.mashable.com/t/mashable_in/photo/default/ranbir-hrithik_uc6u.1248.jpg"
              alt="category-img"
            />
            <h3 className="category-title text-capital">north</h3>
          </Link>
          <Link
            to={"/movies?subcategory=collections"}
            className="categorie-box"
          >
            <img
              src="https://www.valentinemultiplex.com/images/main-slider/2.jpg"
              alt="category-img"
            />
            <h3 className="category-title text-capital">collections</h3>
          </Link>
          <Link to={"/movies?subcategory=trailer"} className="categorie-box">
            <img
              src="https://i.ytimg.com/vi/JMWO8ZeP0RM/maxresdefault.jpg"
              alt="category-img"
            />
            <h3 className="category-title text-capital">trailers</h3>
          </Link>
        </div>
      )}

      {category === "gossips" && (
        <div className="all-categories-container">
          <Link
            to={"/gossips?subcategory=ap-political"}
            className="categorie-box"
          >
            <img
              src="https://jswtv.tv/wp-content/uploads/2022/07/YS-Jagan-hits-it-out-against-Pawan-Kalyan-Chandrababu.jpg"
              alt="category-img"
            />
            <h3 className="category-title text-capital">Andhra</h3>
          </Link>
          <Link
            to={"/gossips?subcategory=ts-political"}
            className="categorie-box"
          >
            <img
              src="https://cdn.siasat.com/wp-content/uploads/2023/12/Untitled-design-2023-12-16T214309.488.jpg"
              alt="category-img"
            />
            <h3 className="category-title text-capital">Telangana</h3>
          </Link>
          <Link to={"/gossips?subcategory=movies"} className="categorie-box">
            <img
              src="https://magicalassam.com/wp-content/uploads/2022/04/Superstars-of-the-South-Charge-Per-Film.jpg"
              alt="category-img"
            />
            <h3 className="category-title text-capital">Movies</h3>
          </Link>
        </div>
      )}

      {category === "ott" && (
        <div className="all-categories-container">
          <Link to={"/ott?subcategory=review"} className="categorie-box">
            <img
              src="https://eetnews.s3.amazonaws.com/uploads/1730080556547_ott-this-week.webp"
              alt="category-img"
            />
            <h3 className="category-title text-capital">reviews</h3>
          </Link>
          <Link to={"/ott?subcategory=release"} className="categorie-box">
            <img
              src="https://cdn.gulte.com/wp-content/uploads/2024/10/Screenshot-2024-10-12-at-11.30.28.png"
              alt="category-img"
            />
            <h3 className="category-title text-capital">release</h3>
          </Link>
        </div>
      )}
    </>
  );
};

export default AllCategories;
