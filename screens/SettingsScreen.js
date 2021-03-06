import React from 'react';
import {
  ScrollView,
  StyleSheet,
  FlatList,
  Button,
  TouchableOpacity,
  Text,
  View,
  Image,
  ActivityIndicator
} from 'react-native';

export default class LinksScreen extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      data: [],
      siteUrl: 'https://fishtivity.net',
      loading: true
    };
  }
  static navigationOptions = {
    title: 'Articles'
  };

  componentDidMount(){
    this.fetchData();
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        {this.state.loading === true ?
          <ActivityIndicator size="large" color="#3a647c" /> : null
        }
        <FlatList
          data={this.state.data}
          keyExtractor={(x, i) => i}
          ItemSeparatorComponent={() => <View style={{height: 0.5,backgroundColor: '#D5D5D5'}}></View>}
          renderItem={
            ({ item }) =>
              <View style={styles.container}>
                <TouchableOpacity onPress={() => {
                  /* 1. Navigate to the Details route with params */
                  this.props.navigation.navigate('Details', {
                  postId: `${item.id}`,
                  postTitle: `${item.title.rendered}`,
                  postContent: `${item.content.rendered}`,
                  postFeaturedImage: `${this.hasThumbnail(this.state.siteUrl, item)}`,
                  postAuthor: `${item._embedded['author'][0].name}`
                  });
                }}>
                  <Image
                    style={{height: 200}}
                    source={{uri: this.hasThumbnail(this.state.siteUrl, item)}}
                  />
                  <View style={styles.postHeader}>
                    <Image
                      style={styles.postAuthorImage}
                      source={{uri: this.hasAuthorThumbnail(item)}}
                    />
                    <Text style={styles.postTitle}>
                      {item.title.rendered}
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
          }
        />
      </ScrollView>
    );
  }

  _handlePress = () => {
    this.props.navigation.navigate('SinglePost',
    {postId: 86}
  );
  }
  fetchData = async () => {
    const response = await fetch("https://fishtivity.net/wp-json/wp/v2/posts?_embed");
    const json = await response.json();
    this.setState({
      data: json,
      loading: false
    });
  };
  hasThumbnail = (siteUrl, post) => {
     if (post._embedded['wp:featuredmedia'] && post._embedded['wp:featuredmedia'][0].media_details && post._embedded['wp:featuredmedia'][0].media_details.sizes)
     {

       return  siteUrl + post._embedded['wp:featuredmedia'][0].source_url;

     }
  };
  hasAuthorThumbnail = (post) => {
     if (post._embedded['author'] && post._embedded['author'][0].avatar_urls)
     {
       return  post._embedded['author'][0].avatar_urls['96'];
     }
  };
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
    paddingHorizontal: 5,
    width: '100%'
  },
  postTitle: {
    paddingHorizontal: 15,
    fontSize: 16,
    fontWeight: '700',
    color: '#333',
    flexDirection: 'column',
    flex: 1
  },
  postAuthorImage: {
    height: 50,
    width: 50,
    borderRadius: 25
  },
  postHeader: {
    paddingVertical: 15,
    flexDirection: 'row',
    alignItems: 'center'
  }
});
