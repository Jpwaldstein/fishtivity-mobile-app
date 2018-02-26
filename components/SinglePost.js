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
  WebView
} from 'react-native';

export default class SinglePost extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      data: [],
      siteUrl: 'https://fishtivity.net'
    };
  }
  static navigationOptions = {
    title: 'Posts'
  };

  componentDidMount(){
    this.fetchData();
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <FlatList
          data={this.state.data}
          keyExtractor={(x, i) => i}
          renderItem={
            ({ item }) =>
              <View style={styles.container}>
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
              </View>
          }
        />
      </ScrollView>
    );
  }
  fetchData = async () => {
    const response = await fetch("https://fishtivity.net/wp-json/wp/v2/posts/${`post_id`}");
    const json = await response.json();
    this.setState({ data: json });
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
    alignItems: 'flex-start'
  }
});
