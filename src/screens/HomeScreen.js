import React, {useState, useEffect} from 'react';
import {Text, View, StyleSheet, ScrollView, FlatList} from 'react-native';
import COLORS from '../constants/Colors';
import GenreCard from '../components/GenreCard';
import MovieCard from '../components/MovieCard';
import ItemSeperator from '../components/ItemSeperator';
import {
  getNowPlayingMovies,
  getUpcomingMovies,
  getAllGenres,
} from '../services/MovieService';

const Genres = ['All', 'Action', 'Comedy', 'Romance', 'Horror', 'Sci-Fi'];

const Home = ({navigation}) => {
  const [activeGenre, setActiveGenre] = useState('All');
  const [nowPlayingMovies, setNowPlayingMovies] = useState({});
  const [upcomingMovies, setUpcomingMovies] = useState({});
  const [genres, setGenres] = useState([{id: 10110, name: 'All'}]);

  useEffect(() => {
    getNowPlayingMovies().then(movieResponse =>
      setNowPlayingMovies(movieResponse.data),
    );
    getUpcomingMovies().then(movieResponse =>
      setUpcomingMovies(movieResponse.data),
    );
    getAllGenres().then(genreResponse =>
      setGenres([...genres, ...genreResponse.data.genres]),
    );
  }, []);

  return (
    <ScrollView>
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>Now Playing</Text>
        <Text style={styles.headerSubTitle}>VIEW ALL</Text>
      </View>
      <View style={styles.genreListContainer}>
        <FlatList
          data={genres}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={item => item.id.toString()}
          ItemSeparatorComponent={() => <ItemSeperator width={20} />}
          ListHeaderComponent={() => <ItemSeperator width={20} />}
          ListFooterComponent={() => <ItemSeperator width={20} />}
          renderItem={({item}) => (
            <GenreCard
              genreName={item.name}
              active={item.name === activeGenre ? true : false}
              onPress={setActiveGenre}
            />
          )}
        />
      </View>
      <View>
        <FlatList
          data={nowPlayingMovies.results}
          horizontal
          showsVerticalScrollIndicator={false}
          keyExtractor={item => item.id.toString()}
          ItemSeparatorComponent={() => <ItemSeperator width={20} />}
          ListHeaderComponent={() => <ItemSeperator width={20} />}
          ListFooterComponent={() => <ItemSeperator width={20} />}
          renderItem={({item}) => (
            <MovieCard
              title={item.title}
              language={item.original_language}
              voteAvarage={item.vote_average}
              voteCount={item.vote_count}
              poster={item.poster_path}
              heartLess={false}
              onPress={() => navigation.navigate('movie', {movieId: item.id})}
            />
          )}
        />
      </View>
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>Coming Soon</Text>
        <Text style={styles.headerSubTitle}>VIEW ALL</Text>
      </View>
      <View>
        <FlatList
          data={upcomingMovies.results}
          horizontal
          showsVerticalScrollIndicator={false}
          keyExtractor={item => item.id.toString()}
          ItemSeparatorComponent={() => <ItemSeperator width={20} />}
          ListHeaderComponent={() => <ItemSeperator width={20} />}
          ListFooterComponent={() => <ItemSeperator width={20} />}
          renderItem={({item}) => (
            <MovieCard
              title={item.title}
              language={item.original_language}
              voteAvarage={item.vote_average}
              voteCount={item.vote_count}
              poster={item.poster_path}
              size={0.5}
              onPress={() => navigation.navigate('movie', {movieId: item.id})}
            />
          )}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  headerTitle: {
    fontSize: 30,
    fontFamily: 'NunitoSans-Black',
  },
  headerSubTitle: {
    fontSize: 14,
    color: COLORS.ACTIVE,
  },
  genreListContainer: {
    paddingVertical: 10,
  },
});
export default Home;
