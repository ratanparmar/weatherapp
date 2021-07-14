import React from 'react'
import TextField from '@material-ui/core/TextField';
import axios from 'axios'
import Button from '@material-ui/core/Button';
import { withStyles } from "@material-ui/core/styles";
//import Avatar from "@material-ui/core/Avatar";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import ReactAnimatedWeather from 'react-animated-weather';
//import { withStyles } from "@material-ui/core/styles";
//import "./styles.css";

const defaults = {
  icon: 'FOG',
  color: 'goldenrod',
  size: 100,
  animate: true
};

const styles = muiBaseTheme => ({
  card: {
    //maxWidth: 300,
    marginLeft: "12%",
    float:"left",
    width:"80%",
    padding:'5% 1% 1% 1%',
    transition: "0.3s",
    boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)",
    "&:hover": {
      boxShadow: "0 36px 70px -12.125px rgba(0,0,0,0.3)"
    }
  },
  media: {
    paddingTop: "37.25%"
  },
  content: {
    textAlign: "left",
    padding: muiBaseTheme.spacing.unit * 3
  },
  divider: {
    margin: `${muiBaseTheme.spacing.unit * 3}px 0`
  },
  heading: {
    fontWeight: "bold"
  },
  subheading: {
    lineHeight: 1.8
  },
  form:{
    paddingLeft:'7%',
    paddingRight:'10%',
    paddingTop:'5%'
  },
  avatar: {
    display: "inline-block",
    border: "2px solid white",
    "&:not(:first-of-type)": {
      marginLeft: -muiBaseTheme.spacing.unit
    }
  }
});
class Search extends React.Component {
  state = {
      search:'',
      temp  : '',
      description:'',
      feelslike:'',
      windSpeed:'',
      istrue:false
  };

  updateSearch = (event) => {

    event.preventDefault()
    if(this.state.search === ''){
      alert("select a city")
    }else{
      console.log(this.state.search)
      console.log(event.target.value)
      let apiKey = process.env.REACT_APP_APIKEY
  //    let value 
      axios({
          method:'GET',
          url:`https://cors-anywhere.herokuapp.com/http://api.weatherstack.com/current?access_key=${apiKey}&query=${this.state.search}`
          

      }).then((response)=>{
          if(response.data){
            if(response.data.current.temperature !== undefined){
                console.log(response.data.current)
                this.setState({ temp:response.data.current.temperature});
                this.setState({ description:response.data.current.weather_descriptions});
                this.setState({ feelslike:response.data.current.feelslike});
                this.setState({ windSpeed:response.data.current.wind_speed});
                this.setState({ istrue:false});
            }
          
        }
      }).catch((e)=>{
        alert("Please select a valid city")
      })
    }
  };

  render() {
    //const { search } = this.state;
    const { classes } = this.props;

    return (
        <div>
         <form className={classes.form} noValidate autoComplete="off" 
          onSubmit={this.updateSearch}>
        
            <TextField  style={{marginLeft:'5%',padding:3}}
            id="outlined-basic" 
            fullWidth 
            label="Search Your City"
            variant="outlined"
            onChange={(event)=>{
              if(event.target.value === ''){
                //console.log(event.target.value)
                this.setState({search:event.target.value})
                this.setState({temp:''})
                this.setState({istrue : false})
              }else{
              this.setState({search:event.target.value})
              this.setState({temp:''})
              this.setState({istrue : true})
              }
            }}
            value={this.state.search}
            
            />{this.state.istrue?<Button variant="contained" color="primary" type='submit' style={{marginLeft:'50%'}}>
            Search
          </Button>
            :<></>
            }
            
            </form>
       { this.state.temp && this.state.search
       ?
        <div> 

    <div className="App">
      <Card className={classes.card}>
        <CardMedia
          className={classes.media}
          image={
            "https://i.pinimg.com/originals/20/e6/03/20e60377fb5710a7335be9bec1884877.gif"
          }
        />
            <p>Temparature:{this.state.temp}°C</p>
            {this.state.temp >20 && this.state.temp <30
            ? <ReactAnimatedWeather
            icon="CLEAR_DAY"
            color={defaults.color}
            size={defaults.size}
            animate={defaults.animate}
          />
          : <ReactAnimatedWeather
          icon={defaults.icon}
          color={defaults.color}
          size={defaults.size}
          animate={defaults.animate}
        />
            }
            
            <p>FeelsLike:{this.state.feelslike}°C</p>
            <p>Description:{this.state.description}</p>

            {this.state.windSpeed>0?<p>Wind Speed:{this.state.windSpeed}</p>:null}
        <CardContent className={classes.content}>
          <Typography
            className={"MuiTypography--heading"}
            variant={"h6"}
            gutterBottom
          >
            <Divider className={classes.divider} light />
          </Typography>
          <Typography
            className={"MuiTypography--subheading"}
            variant={"caption"}
          >
            {/* <Button>Expand</Button> */}
          </Typography>
          {/* 
          {faces.map(face => (
            <Avatar className={classes.avatar} key={face} src={face} />
          ))} */}
        </CardContent>
      </Card>
    </div>           
    </div>
       :''
          }
        </div>
    );
  }
}
//const Wrapped withStyles(styles)(App);
export default withStyles(styles)(Search)