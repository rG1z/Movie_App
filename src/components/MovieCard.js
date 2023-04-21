import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableNativeFeedback,
  Image,
} from 'react-native';
import COLORS from '../constants/Colors';
import {TouchableOpacity} from 'react-native-gesture-handler';
import AntDesign from 'react-native-vector-icons/AntDesign';
import IMAGES from '../constants/Images';
import {getPoster, getLanguage} from '../services/MovieService';

const MovieCard = ({
  title,
  poster,
  language,
  voteAvarage,
  voteCount,
  size,
  heartLess,
  onPress,
}) => {
  const [liked, setLiked] = useState(false);
  const [voteCountValue, setVoteCountValue] = useState(voteCount);

  return (
    <TouchableOpacity activeOpacity={0.8} onPress={onPress}>
      <ImageBackground
        style={{...styles.container, width: 230 * size, height: 340 * size}}
        imageStyle={{borderRadius: 12}}
        source={{uri: getPoster(poster)}}>
        <View style={{...styles.imdbContainer, paddingVertical: 3 * size}}>
          <Image
            source={IMAGES.IMDB}
            resizeMode="cover"
            style={{...styles.imdbImage, height: 20 * size, width: 50 * size}}
          />
          <Text
            style={{
              ...styles.imdbRating,
              marginRight: 5 * size,
              fontSize: 14 * size,
            }}>
            {voteAvarage}
          </Text>
        </View>
        {!heartLess ? (
          <TouchableNativeFeedback
            onPress={() => {
              setLiked(!liked);
              setVoteCountValue(
                liked ? voteCountValue - 1 : voteCountValue + 1,
              );
            }}>
            <AntDesign
              name={liked ? 'heart' : 'hearto'}
              size={25}
              color={liked ? COLORS.HEART : COLORS.WHITE}
              style={{position: 'absolute', bottom: 10, left: 10}}
            />
          </TouchableNativeFeedback>
        ) : null}
      </ImageBackground>
      <View>
        <Text
          style={{...styles.movieTitle, width: 230 * size}}
          numberOfLines={3}>
          {title}
        </Text>
        <View style={styles.MovieSubTitleContainer}>
          <Text style={styles.MovieSubTitle}>
            {getLanguage(language).english_name}
          </Text>
          <View style={styles.rowAndCenter}>
            <AntDesign
              name="heart"
              size={20 * size}
              color={COLORS.HEART}
              style={{marginRight: 5}}
            />
            <Text>{voteCountValue}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 340,
    width: 230,
    borderRadius: 12,
    elevation: 5,
    marginVertical: 2,
  },
  movieTitle: {
    fontFamily: 'NunitoSans-ExtraBold',
    color: COLORS.GRAY,
    paddingVertical: 2,
    marginTop: 5,
    width: 230,
  },
  MovieSubTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  MovieSubTitle: {
    fontSize: 14,
    fontFamily: 'NunitoSans-Regular',
  },
  rowAndCenter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  imdbContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-end',
    backgroundColor: COLORS.YELLOW,
    borderBottomLeftRadius: 5,
    borderTopRightRadius: 12,
    paddingVertical: 3,
  },
  imbdImage: {
    height: 20,
    width: 50,
    borderBottomLeftRadius: 5,
  },
  imdbRating: {
    marginRight: 5,
    color: COLORS.HEART,
    fontFamily: 'NunitoSans-ExtraBold',
  },
});

MovieCard.defaultProps = {
  size: 1,
  heartLess: true,
};

export default MovieCard;
