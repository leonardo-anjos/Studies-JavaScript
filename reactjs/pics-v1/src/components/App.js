import React from 'react';
import unsplash from '../api/unsplhash';
import SearchBar from "./SearchBar";
import ImageList from './ImageList';

export default class App extends React.Component {
	
	state = {
		images: []
	}
	
	onSearchSubmit = async (term) => {
		console.log(term);
		const response = await unsplash.get('/search/photos', {
			params: { query: term }
		});

		console.log(this); 
		this.setState({ images: response.data.results })
		console.log(response.data.results);
	
	}

	render() {
		return(
			<div className="ui container" style={{marginTop: '30px'}}>
				<SearchBar onSubmit={this.onSearchSubmit}/>
				Found: {this.state.images.length} images
				<ImageList images={this.state.images}/>
			</div>
		);
	}

};
