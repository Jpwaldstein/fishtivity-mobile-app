import React from 'react';
import HTMLView from 'react-native-htmlview';
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

export default class DetailsScreen extends React.Component {
  render() {
    /* 2. Read the params from the navigation state */
    const { params } = this.props.navigation.state;
    const postId = params ? params.postId : null;
    const postContent = params ? params.postContent : null;
    const postTitle = params ? params.postTitle : null;
    const postFeaturedImage = params ? params.postFeaturedImage : null;
    const postAuthor = params ? params.postAuthor : null;

    return (
        <ScrollView style={styles.container}>
          {/* <Button
            title="Go back"
            onPress={() => this.props.navigation.goBack()}
          /> */}

          <Text style={styles.postTitle}>{postTitle}</Text>

          <Text style={styles.postAuthor}>By: {postAuthor}</Text>
          <View style={styles.postFeauredImageWrapper}>
            <Image
              style={{height: 200}}
              source={{uri: postFeaturedImage}}
            />
          </View>
          <HTMLView
            value={postContent}
            stylesheet={htmlStyles}
          />
        </ScrollView>
    );
  }
}

var htmlStyles = StyleSheet.create({
  a: {
    fontWeight: '300',
    color: '#FF3366', // pink links
  },
  h1: {
    fontSize: 20,
    fontWeight: '500'
  }
})
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
    paddingHorizontal: 5,
    width: '100%'
  },
  postTitle: {
    paddingTop: 25,
    fontSize: 24,
    fontWeight: '700',
    color: '#333',
    flexDirection: 'column',
    flex: 1
  },
  postAuthor: {
    fontSize: 16,
    color: '#444'
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
  },
  postFeauredImageWrapper: {
    paddingBottom: 20,
    paddingTop: 25
  }
});
