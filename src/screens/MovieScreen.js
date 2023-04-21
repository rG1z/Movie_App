import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
  Linking,
  FlatList,
  ScrollView,
} from 'react-native';
import COLORS from '../constants/Colors';
import {
  getMovieById,
  getPoster,
  getVideo,
  getLanguage,
} from '../services/MovieService';
import ItemSeperator from '../components/ItemSeperator';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {APPEND_TO_RESPONSE as AR} from '../constants/Urls';
import MovieCard from '../components/MovieCard';
import CastCard from '../components/CastCard';

const {height, width} = Dimensions.get('window');

const setHeight = h => (height / 100) * h;
const setWidth = w => (width / 100) * w;

const MovieScreen = ({route, navigation}) => {
  const {movieId} = route.params;
  const [movie, setMovie] = useState({});
  const [isCastSelected, setIsCastSelected] = useState(true);

  useEffect(() => {
    getMovieById(
      movieId,
      `${AR.VIDEOS},${AR.CREDITS},${AR.RECOMMENDATIONS},${AR.SIMILAR}`,
    ).then(response => setMovie(response?.data));
  }, []);
  return (
    <ScrollView>
      <View style={styles.moviePosterImageContainer}>
        <Image
          style={styles.moviePosterImage}
          resizeMode="cover"
          source={{uri: getPoster(movie.backdrop_path)}}
        />
      </View>
      <TouchableOpacity
        style={styles.playButton}
        onPress={() => Linking.openURL(getVideo(movie.videos.results[0].key))}>
        <AntDesign name="playcircleo" size={55} color={COLORS.WHITE} />
      </TouchableOpacity>
      <ItemSeperator height={setHeight(37)} />
      <View style={styles.movieTitleContainer}>
        <Text style={styles.movieTitle}>{movie?.original_title}</Text>
        <View style={styles.row}>
          <AntDesign name="heart" size={22} color={COLORS.HEART} />
          <Text style={styles.ratingText}>{movie?.vote_average}</Text>
        </View>
      </View>
      <Text style={styles.genreText}>
        {movie?.genres?.map(genre => genre?.name)?.join(', ')} |{' '}
        {movie?.runtime} Min
      </Text>
      <Text style={styles.genreText}>
        {getLanguage(movie?.original_language)?.english_name}
      </Text>
      <View style={styles.overviewContainer}>
        <Text style={styles.overviewTitle}>Overview</Text>
        <Text style={styles.overviewText}>{movie?.overview}</Text>
      </View>
      <View>
        <Text style={styles.castTitle}>Cast</Text>
        <View style={styles.castSubMenuContainer}>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => setIsCastSelected(true)}>
            <Text
              style={{
                ...styles.castSubMenuText,
                color: isCastSelected ? COLORS.BLACK : COLORS.LIGHT_GRAY,
              }}>
              Cast
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => setIsCastSelected(false)}>
            <Text
              style={{
                ...styles.castSubMenuText,
                color: isCastSelected ? COLORS.LIGHT_GRAY : COLORS.BLACK,
              }}>
              Crew
            </Text>
          </TouchableOpacity>
        </View>
        <FlatList
          style={{marginVertical: 5}}
          data={isCastSelected ? movie?.credits?.cast : movie?.credits?.crew}
          keyExtractor={item => item?.credit_id}
          horizontal
          showsHorizontalScrollIndicator={false}
          ListHeaderComponent={() => <ItemSeperator width={20} />}
          ItemSeparatorComponent={() => <ItemSeperator width={20} />}
          ListFooterComponent={() => <ItemSeperator width={20} />}
          renderItem={({item}) => (
            <CastCard
              originalName={item?.name}
              characterName={isCastSelected ? item?.character : item?.job}
              image={item?.profile_path}
            />
          )}
        />
      </View>
      <Text style={styles.extraListTitle}>Recommended Movies</Text>
      <FlatList
        data={movie?.recommendations?.results}
        keyExtractor={item => item?.id?.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        ListHeaderComponent={() => <ItemSeperator width={20} />}
        ItemSeparatorComponent={() => <ItemSeperator width={20} />}
        ListFooterComponent={() => <ItemSeperator width={20} />}
        renderItem={({item}) => (
          <MovieCard
            title={item.title}
            language={item.original_language}
            voteAverage={item.vote_average}
            voteCount={item.vote_count}
            poster={item.poster_path}
            size={0.6}
            onPress={() => navigation.navigate('movie', {movieId: item.id})}
          />
        )}
      />
      <Text style={styles.extraListTitle}>Similar Movies</Text>
      <FlatList
        data={movie?.similar?.results}
        keyExtractor={item => item?.id?.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        ListHeaderComponent={() => <ItemSeperator width={20} />}
        ItemSeparatorComponent={() => <ItemSeperator width={20} />}
        ListFooterComponent={() => <ItemSeperator width={20} />}
        renderItem={({item}) => (
          <MovieCard
            title={item.title}
            language={item.original_language}
            voteAverage={item.vote_average}
            voteCount={item.vote_count}
            poster={item.poster_path}
            size={0.6}
            onPress={() => navigation.navigate('movie', {movieId: item.id})}
          />
        )}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.BASIC_BACKGROUND,
  },
  moviePosterImageContainer: {
    height: setHeight(35),
    width: setWidth(145),
    alignItems: 'center',
    position: 'absolute',
    left: setWidth((100 - 145) / 2),
    top: 0,
    borderBottomRightRadius: 300,
    borderBottomLeftRadius: 300,
    elevation: 8,
  },
  moviePosterImage: {
    borderBottomRightRadius: 300,
    borderBottomLeftRadius: 300,
    width: setWidth(145),
    height: setHeight(35),
  },
  playButton: {
    position: 'absolute',
    top: 110,
    left: setWidth(50) - 70 / 2,
    elevation: 10,
  },
  movieTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  movieTitle: {
    color: COLORS.BLACK,
    fontFamily: 'NunitoSans-ExtraBold',
    fontSize: 18,
    width: setWidth(60),
  },
  ratingText: {
    marginLeft: 5,
    color: COLORS.BLACK,
    fontFamily: 'NunitoSans-ExtraBold',
    fontSize: 15,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  genreText: {
    color: COLORS.LIGHT_GRAY,
    paddingHorizontal: 20,
    paddingTop: 5,
    fontFamily: 'NunitoSans-Bold',
    fontSize: 13,
  },
  overviewContainer: {
    backgroundColor: COLORS.EXTRA_LIGHT_GRAY,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginVertical: 10,
  },
  overviewTitle: {
    color: COLORS.BLACK,
    fontFamily: 'NunitoSans-Bold',
    fontSize: 18,
  },
  overviewText: {
    color: COLORS.LIGHT_GRAY,
    paddingVertical: 5,
    fontFamily: 'NunitoSans-Bold',
    fontSize: 13,
    textAlign: 'justify',
  },
  castTitle: {
    marginLeft: 20,
    color: COLORS.BLACK,
    fontFamily: 'NunitoSans-Bold',
    fontSize: 18,
  },
  castSubMenuContainer: {
    marginLeft: 20,
    flexDirection: 'row',
    marginVertical: 5,
  },
  castSubMenuText: {
    marginRight: 10,
    color: COLORS.BLACK,
    fontFamily: 'NunitoSans-Bold',
    fontSize: 13,
  },
  extraListTitle: {
    marginLeft: 20,
    color: COLORS.BLACK,
    fontFamily: 'NunitoSans-Bold',
    fontSize: 18,
    marginVertical: 8,
  },
});

export default MovieScreen;
