import React from 'react';

import { SearchBar } from 'react-native-elements';

const {
  state = {
    search: '',
  }
  updateSearch = (search) => {
    this.setState({ search });
  };
    return (
      <SearchBar
        placeholder="Type Here..."
        //onChangeText={this.updateSearch}
        value={search}
      />
    );
  
}