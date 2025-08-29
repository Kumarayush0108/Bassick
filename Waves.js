document.addEventListener('DOMContentLoaded', () => {
    // Elements
    const startBtn = document.getElementById('startBtn');
    const introContainer = document.querySelector('.intro-container');
    const playerWrapper = document.getElementById('playerWrapper');
    const logo = document.getElementById('logo');
    const audioPlayer = document.getElementById('audioPlayer');
    const playPauseBtn = document.getElementById('playPauseBtn');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const volumeSlider = document.getElementById('volumeSlider');
    const volumeIcon = document.getElementById('volumeIcon');
    const progressBar = document.getElementById('progressBar');
    const progress = document.getElementById('progress');
    const currentTimeEl = document.getElementById('currentTime');
    const totalTimeEl = document.getElementById('totalTime');
    const trackTitle = document.getElementById('trackTitle');
    const albumName = document.getElementById('albumName');
    const albumArt = document.getElementById('albumArt');
    const playlistEl = document.getElementById('playlist');
    const albumListEl = document.getElementById('albumList');
    const currentAlbumTitle = document.getElementById('currentAlbumTitle');
    const listenerCountEl = document.getElementById('listenerCount');
    const socialListenerCountEl = document.getElementById('socialListenerCount');

    // Enhanced elements
    const searchInput = document.getElementById('searchInput');
    const clearSearch = document.getElementById('clearSearch');
    const shuffleBtn = document.getElementById('shuffleBtn');
    const likeBtn = document.getElementById('likeBtn');

    let isPlaying = false;
    let currentTrackIndex = 0;
    let currentAlbum = 'All';
    let filteredPlaylist = [];
    let isShuffleOn = false;
    let isSearching = false;

    // Liked songs functionality
    const LIKED_SONGS_KEY = 'bassickWave_likedSongs';
    let likedSongs = JSON.parse(localStorage.getItem(LIKED_SONGS_KEY)) || [];

    const playlist = [
        // HipHop
        { title: "Bure Din", artist: "Seedhe Maut ft. Mick Jenkins", album: "HipHop", url: "audio/Bure Din.mp3", art: "image/Bure-Din.jpg" },
        { title: "Kodak", artist: "King ft. Seedhe Maut", album: "HipHop", url: "audio/Kodak.mp3", art: "image/kodak.jpg" },
        { title: "Galat Karam", artist: "Panther ft. Raga", album: "HipHop", url: "audio/Galat Karam.mp3", art: "image/Galat-Karam.jpg" },
        { title: "Hola Amigo", artist: "Kr$na ft. Seedhe Maut & Umair", album: "HipHop", url: "audio/Hola Amigo.mp3", art: "image/hola-amigo.jpg" },
        { title: "Maina", artist: "Seedhe Maut", album: "HipHop", url: "audio/Maina.mp3", art: "image/maina.jpg" },
        { title: "Tour Shit", artist: "Seedhe Maut", album: "HipHop", url: "audio/Tour Shit.mp3", art: "image/tour shit.png" },
        { title: "TT", artist: "Seedhe Maut", album: "HipHop", url: "audio/Tt.mp3", art: "image/Tt.jpg" },
        { title: "Shutdown", artist: "Seedhe Maut", album: "HipHop", url: "audio/Shutdown.mp3", art: "image/shutdown.jpeg" },
        { title: "Kaanch Ke Ghar", artist: "Seedhe Maut", album: "HipHop", url: "audio/Kaanch Ke Ghar.mp3", art: "image/kaanch ke ghar.jpg" },
        { title: "Nalla Freestyle", artist: "Seedhe Maut & DJ SA", album: "HipHop", url: "audio/Nalla FreeStyle.mp3", art: "image/nalla-freestyle.jpg" },
        { title: "Karta Kya Hai", artist: "Karma ft. Raftaar", album: "HipHop", url: "audio/Karta Kya Hai.mp3", art: "image/karta-kya-hai.jpg" },
        { title: "Pahiye", artist: "Panther", album: "HipHop", url: "audio/Pahiye.mp3", art: "image/dhoom-v.jpg" },
        { title: "Nanchaku", artist: "Seedhe Maut ft. MC Stan", album: "HipHop", url: 'audio/Nanchaku.mp3', art: "image/nanchaku.jpg" },
        { title: "Akatsuki", artist: "Seedhe Maut ft. Raga", album: "HipHop", url: "audio/Akatsuki.mp3", art: "image/Khatta Flow.png" },
        { title: "Ring A Rose", artist: "Karma", album: "HipHop", url: "audio/RING A ROSE.mp3", art: "image/ring-a-rose.jpg" },
        { title: "Asal G", artist: "Seedhe Maut ft. Faris Shafi & Talal Qureshi", album: "HipHop", url: "audio/Asal G.mp3", art: "image/Khatta Flow.png" },
        { title: "Dharna", artist: "Panther ft. Spectra", album: "HipHop", url: "audio/Dharna.mp3", art: "image/dhoom-v.jpg" },
        { title: "No Cap", artist: "Kr$na", album: "HipHop", url: "audio/No Cap.mp3", art: "image/No_Cap.jpg" },
        { title: "3 Drags", artist: "VVVV", album: "HipHop", url: "audio/3 DRAGS.mp3", art: "image/3-drags.webp" },
        { title: "RED", artist: "Seedhe Maut", album: "HipHop", url: "audio/RED.mp3", art: "image/red.jpg" },
        { title: "Khatta Flow", artist: "Seedhe Maut ft. KR$NA", album: "HipHop", url: "audio/Khatta Flow.mp3", art: "image/Khatta Flow.png" },
        { title: "Champions", artist: "Seedhe Maut", album: "HipHop", url: "audio/Champions.mp3", art: "image/Khatta Flow.png" },
        { title: "Paycheck", artist: "VVVV", album: "HipHop", url: "audio/PAYCHECK.mp3", art: "image/paycheck.jpg" },
        { title: "Angaar", artist: "Ikka ft. Raftaar", album: "HipHop", url: "audio/Angaar.mp3", art: "image/angaar.webp" },
        { title: "Mr. Rambo", artist: "Young Sammy", album: "HipHop", url: "audio/Mr. Rambo.mp3", art: "image/mr-rambo.jpg" },
        { title: "3:59 AM", artist: "Divine", album: "HipHop", url: "audio/3_59 AM.mp3", art: "image/divine.jpg" },
        { title: "Bajenge", artist: "Badshah ft. Seedhe Maut", album: "HipHop", url: "audio/Bajenge.mp3", art: "image/bajenge.jpg" },
        { title: "Swah!", artist: "Seedhe Maut ft.Baadshah", album: "HipHop", url: "audio/Swah.mp3", art: "image/Khatta Flow.png" },
        { title: "Baawe", artist: "Raftaar ft. Badshah", album: "HipHop", url: "audio/BAAWE.mp3", art: "image/baawe.jpg" },
        { title: "Gojira", artist: "Ikka", album: "HipHop", url: "audio/Gojira - Ikka.mp3", art: "image/Gojira.jpg" },
        { title: "Luka Chippi", artist: "Seedhe Maut", album: "HipHop", url: "audio/Luka Chippi.mp3", art: "image/Khatta Flow.png" },
        { title: "Intro", artist: "Young Sammy", album: "HipHop", url: "audio/Intro - YS.mp3", art: "image/intro.jpg" },
        { title: "Nawazuddin", artist: "Seedhe Maut", album: "HipHop", url: "audio/Nawazuddin.mp3", art: "image/TBSM.png" },
        { title: "Naksha", artist: "Seedhe Maut", album: "HipHop", url: "audio/Naksha.mp3", art: "image/shakti.jpeg" },
        { title: "Raat Ki Rani", artist: "Seedhe Maut", album: "HipHop", url: "audio/Raat Ki Rani.mp3", art: "image/shakti.jpeg" },
        { title: "101", artist: "Seedhe Maut", album: "HipHop", url: "audio/101.mp3", art: "image/101.jpg" },
        { title: "KOTM", artist: " Vaibhav", album: "HipHop", url: "audio/KOTM.mp3", art: "image/kotm.jpg" },
        { title: "4:10", artist: "Divine", album: "HipHop", url: "audio/4.10.mp3", art: "image/4.10.webp" },
        { title: "Bhala Kyun", artist: "DOTM", album: "HipHop", url: "audio/Bhala Kyun.mp3", art: "image/bhala-kyun.jpg" },
        { title: "Goat Shit", artist: "King ft. Karma", album: "HipHop", url: "audio/GOAT SHIT.mp3", art: "image/goat-shit.webp" },
        { title: "11k", artist: "Seedhe Maut", album: "HipHop", url: "audio/11K.mp3", art: "image/tour shit.png" },
        { title: "I Guess", artist: "Kr$na", album: "HipHop", url: "audio/I Guess.mp3", art: "image/hola-amigo.jpg" },
        { title: "Kheech Maari", artist: "Raga ft. DG Immortal", album: "HipHop", url: "audio/Kheench Maari.mp3", art: "image/Kheench-Maari.jpg" },
        { title: "Shayaar", artist: "Bharat chauhan & Seedhe maut", album: "HipHop", url: "audio/Shaayar.mp3", art: "image/tour shit.png" },
        { title: "Namastute", artist: "Seedhe Maut", album: "HipHop", url: "audio/Namastute.mp3", art: "image/namastute.jpg" },
        { title: "Gaddi Rokk", artist: "DOTM ft. Prahaar", album: "HipHop", url: "audio/Gaddi Rokk.mp3", art: "image/GR.jpeg" },
        { title: "Terey Papa", artist: "OG Lucifer ft. Calm", album: "HipHop", url: "audio/Terey Papa.mp3", art: "image/tppa.webp" },
        // Panjabi
        { title: "Chu Gon Do", artist: "Karan Aujla", album: "Panjabi", url: "audio/Chu Gon Do.mp3", art: "image/chu-gon-do.jpg" },
        { title: "Don't Look", artist: "Karan Aujla", album: "Panjabi", url: "audio/Dont Look.mp3", art: "image/dont-look.webp" },
        { title: "12 Bande", artist: "Virender Brar", album: "Panjabi", url: "audio/12 Bande.mp3", art: "" },
        { title: "Ha Haige aa", artist: "Karan Aujla", album: "Panjabi", url: "audio/Haan Haige Aa.mp3", art: "image/haan-haige-aa.webp" },
        { title: "Feel The Flava (Itz All Good)", artist: "Karan Aujla", album: "Panjabi", url: "audio/Feel The Flava (Itz All Good).mp3", art: "image/feel the flava.jpg" },
        { title: "Click That B Kickin It (Yaar jatt De)", artist: "Karan Aujla", album: "Panjabi", url: "audio/Click That B Kickin It.mp3", art: "image/b.t.f.u.webp" },
        { title: "It Ain't Legal", artist: "Karan Aujla", album: "Panjabi", url: "audio/It Aint Legal.mp3", art: "image/feel the flava.jpg" },
        { title: "Check It Out", artist: "Parmish Verma ft. Paradox", album: "Panjabi", url: "audio/Check It Out.mp3", art: "image/cio.jpg" },
        { title: "Itz A Hustle", artist: "Karan Aujla", album: "Panjabi", url: "audio/Itz A Hustle.mp3", art: "image/feel the flava.jpg" },
        { title: "Here & There", artist: "Karan Aujla", album: "Panjabi", url: "audio/Here And There.mp3", art: "image/feel the flava.jpg" },
        { title: "I Really Do...", artist: "Karan Aujla", album: "Panjabi", url: "audio/I Really Do....mp3", art: "image/mf-gabhru-cover.jpg" },
        { title: "7.7 Magnitude", artist: "Karan Aujla", album: "Panjabi", url: "audio/7.7 Magnitude.mp3", art: "image/mf-gabhru-cover.jpg" },
        { title: "Daytona", artist: "Karan Aujla", album: "Panjabi", url: "audio/Daytona.mp3", art: "image/mf-gabhru-cover.jpg" },
        { title: "52 Bars", artist: "Karan Aujla", album: "Panjabi", url: "audio/52 Bars.mp3", art: "image/Four-You.jpg" },
        { title: "Ima Do My Thiiing", artist: "Karan Aujla", album: "Panjabi", url: "audio/Ima Do My Thiiing.mp3", art: "image/mf-gabhru-cover.jpg" },
        { title: "Mf Gabhru!", artist: "Karan Aujla", album: "Panjabi", url: "audio/Mf Gabhru!.mp3", art: "image/mf-gabhru-cover.jpg" },
        { title: "On Top", artist: "Karan Aujla", album: "Panjabi", url: "audio/On Top.mp3", art: "image/On-Top.jpg" },
        { title: "For A Reason", artist: "Karan Aujla", album: "Panjabi", url: "audio/For A Reason.mp3", art: "image/mf-gabhru-cover.jpg" },
        { title: "Him", artist: "Karan Aujla", album: "Panjabi", url: "audio/Him.mp3", art: "image/mf-gabhru-cover.jpg" },
        { title: "Youre U Tho", artist: "Karan Aujla", album: "Panjabi", url: "audio/Youre U Tho.mp3", art: "image/mf-gabhru-cover.jpg" },
        { title: "Aam Jahe Munde", artist: "Parmish Verma ft. Pradhan", album: "Panjabi", url: "audio/Aam Jahe Munde.mp3", art: "image/aam-jehe-munde.jpg" },
        { title: "STFU", artist: "AP Dhillon", alnum: "Panjabi", url: "audio/STFU.mp3", art: "image/size_m.jpg" },
        { title: "Daler", artist: "Virender Brar", alnum: "Panjabi", url: "audio/Daler.mp3", art: "image/daler.jpg" },
        // English
        { title: "All The Stars", artist: "SZA ft. Kendrick Lamar", album: "English", url: "audio/All The Stars.mp3", art: "image/Ats.jpg" },
        { title: "APT", artist: "Rosie ft. Bruno Mars", album: "English", url: "audio/APT.mp3", art: "image/Rose-–-APT-Ft.-Bruno-Mars-scaled.webp" },
        { title: "As It Was", artist: "Harry Styles", album: "English", url: "audio/As It Was.mp3", art: "image/As-It-Was.jpg" },
        { title: "Blinding Lights", artist: "Weekend", album: "English", url: "audio/Blinding Lights.mp3", art: "image/Bl.png" },
        { title: "Night Changes", artist: "One Direction", album: "English", url: "audio/Night Changes.mp3", art: "image/NC.png" },
        { title: "Die With A Smile", artist: "Lady Gaga ft. Bruno Mars", album: "English", url: "audio/Die With A Smile.mp3", art: "image/dwas.png" },
        { title: "Luther", artist: "Kendrick Lamar ft. SZA", album: "English", url: "audio/luther.mp3", art: "image/tv-off.webp" },
        { title: "Coolio", artist: "Gangsta's Paradise", album: "English", url: "audio/Coolio.mp3", art: "image/Coolio.jpg" },
        { title: "ExtraL", artist: "Jennie ft. Doechii", album: "English", url: "audio/ExtraL.mp3", art: "image/ExtraL.png" },
        { title: "Everyday Normal Guy 2", artist: "Jon Lajoie", album: "English", url: "audio/Everyday Normal Guy 2.mp3", art: "image/eng2.jpeg" },
        { title: "Not LIke Us", artist: "Kendrick Lamar", album: "English", url: "audio/Not Like Us.mp3", art: "image/nlus.jpg" },
        { title: "Heat Waves", artist: "Glass Animals", album: "English", url: "audio/Heat Waves.mp3", art: "image/HW.png" },
        { title: "Cry For Me", artist: "Weekend", album: "English", url: "audio/Cry For Me.mp3", art: "image/cry-for-u.jpg" },
        { title: "Starboy", artist: "Weekend", album: "English", url: "audio/Starboy.mp3", art: "image/strboy.jpeg" },
        { title: "Sunflower", artist: "Post Malone", album: "English", url: "audio/Sunflower.mp3", art: "image/Sf.jpg" },
        { title: "tv off", artist: "Kendrick Lamar", album: "English", url: "audio/tv off.mp3", art: "image/tv-off.webp" },
        { title: "Without Me", artist: "Eminem", album: "English", url: "audio/Without Me.mp3", art: "image/withot.jpg" },
        { title: "Skyfall", artist: "Adele", album: "English", url: "audio/Skyfall.mp3", art: "image/Skyfall.jpg" },
        { title: "Rockstar", artist: "Post Malone ft. 21 Savage", album: "English", url: "audio/Rockstar.mp3", art: "image/21.jpg" },
        // Haryanvi
        { title: "Block", artist: "Dhandha Nyoliwala", album: "Haryanvi", url: "audio/Block.mp3", art: "image/block.webp" },
        { title: "Western UP", artist: "Dhandha Nyoliwala", album: "Haryanvi", url: "audio/WESTERN UP.mp3", art: "image/images.jpeg" },
        { title: "Up To U", artist: "Dhandha Nyoliwala", album: "Haryanvi", url: "audio/Up To U.mp3", art: "image/up2u.jpg" },
        { title: "Ram Ram", artist: "MC Square", album: "Haryanvi", url: "audio/Ram Ram.mp3", art: "image/ram ram.jpeg" },
        { title: "Knife Brows", artist: "Dhandha Nyoliwala", album: "Haryanvi", url: "audio/Knife Brows.mp3", art: "image/kb.jpg" },
        { title: "Kaale Sheshe", artist: "Addy Nagar", album: "Haryanvi", url: "audio/Kaley Sheshe.mp3", art: "image/kaale sheeshe.jpg" },
        { title: "Ego Killer", artist: "Dhandha Nyoliwala", album: "Haryanvi", url: "audio/Ego Killer.mp3", art: "image/egoklr.jpg" },
        { title: "Russian Bandana", artist: "Dhandha Nyoliwala", album: "Haryanvi", url: "audio/Russian Bandana.mp3", art: "image/rb.jpg" },
        { title: "Rubicon", artist: "Dhandha Nyoliwala", album: "Haryanvi", url: "audio/RUBICON.mp3", art: "image/rbn.jpg" },
        // Hindi
        { title: "Khwaab", artist: "Faheem Abdullah, Pho", album: "Hindi", url: "audio/Khwaab.mp3", art: "image/lostfound.webp" },
        { title: "Ehsaas", artist: "Faheem Abdullah ", album: "Hindi", url: "audio/Ehsaas.mp3", art: "image/ehsaas.jpg" },
        { title: "Soulmate", artist: "Badshah ,Arijit Singh", album: "Hindi", url: "audio/Soulmate.mp3", art: "image/soulmate.jpg" },
        { title: "Ishq", artist: "Faheem Abdullah", album: "Hindi", url: "audio/Ishq.mp3", art: "image/lostfound.webp" },
        { title: "Saiyaara", artist: "Faheem Abdullah", album: "Hindi", url: "audio/Saiyaara.mp3", art: "image/saiyaara.webp" },
        { title: "Sajde", artist: "Faheem Abdullah", album: "Hindi", url: "audio/Sajde.mp3", art: "image/lostfound.webp" },
        { title: "Teri Yaad", artist: "Aditya Rikhari", album: "Hindi", url: "audio/TERI YAAD.mp3", art: "image/Teri-Yaad.jpg" },
        { title: "Humdum", artist: "Aditya Rikhari", album: "Hindi", url: "audio/Humdum.mp3", art: "image/Humdum.jpg" },
        { title: "Laapta", artist: "King", album: "Hindi", url: "audio/Laapata.mp3", art: "image/king.jpg" },
        { title: "Teri Na Ho Saki", artist: "King", album: "Hindi", url: "audio/Teri Ho Na Saki.mp3", art: "image/king.jpg" },
        { title: "Dhun", artist: "Arijit Singh", album: "Hindi", url: "audio/Dhun.mp3", art: "image/dhun.jpg" },
        { title: "Barbaad", artist: "Jubin Nutiyal", album: "Hindi", url: "audio/Barbaad.mp3", art: "image/barbaad.jpg" },
        { title: "Iktara", artist: "Amit Trivedi, Kavita Seth", album: "Hindi", url: "audio/Iktara.mp3", art: "image/iktara.jpg" },
    ];

    startBtn.addEventListener('click', () => {
        logo.classList.add('moved');
        introContainer.classList.add('hidden');
        playerWrapper.classList.add('active');
        loadAndPlay(0);
    });

    const albums = ['All', ...new Set(playlist.map(track => track.album))];

    function renderAlbumList() {
        albumListEl.innerHTML = '';

        if (likedSongs.length > 0) {
            const likedLi = document.createElement('li');
            likedLi.textContent = '❤️ Liked Songs';
            likedLi.className = currentAlbum === 'Liked Songs' ? 'active' : '';
            likedLi.addEventListener('click', () => {
                currentAlbum = 'Liked Songs';
                filteredPlaylist = likedSongs;
                currentAlbumTitle.textContent = 'Liked Songs';
                currentTrackIndex = 0;
                renderPlaylist();
                updateAlbumActiveState();
            });
            albumListEl.appendChild(likedLi);
        }

        albums.forEach(album => {
            const li = document.createElement('li');
            li.textContent = album;
            li.className = album === currentAlbum ? 'active' : '';
            li.addEventListener('click', () => {
                currentAlbum = album;
                isSearching = false;
                searchInput.value = '';
                clearSearch.style.visibility = 'hidden';
                filterAndRenderPlaylist();
                updateAlbumActiveState();
            });
            albumListEl.appendChild(li);
        });
    }

    function updateAlbumActiveState() {
        document.querySelectorAll('.album-list li').forEach(item => {
            item.classList.remove('active');
            if ((item.textContent === currentAlbum) ||
                (currentAlbum === 'Liked Songs' && item.textContent === '❤️ Liked Songs')) {
                item.classList.add('active');
            }
        });
    }

    function filterAndRenderPlaylist() {
        if (currentAlbum === 'Liked Songs') {
            filteredPlaylist = likedSongs;
        } else {
            filteredPlaylist = currentAlbum === 'All' ? playlist : playlist.filter(track => track.album === currentAlbum);
        }
        currentAlbumTitle.textContent = currentAlbum === 'All' ? 'All Tracks' : currentAlbum;
        renderPlaylist();
    }

    function renderPlaylist() {
        playlistEl.innerHTML = '';
        filteredPlaylist.forEach((track, index) => {
            const li = document.createElement('li');
            li.className = index === currentTrackIndex ? 'active' : '';
            li.innerHTML = `
                <div class="song-info">
                    <span class="song-title">${track.title}</span>
                    <span class="song-artist">${track.artist}</span>
                </div>
                <span class="song-duration">🎧</span>
            `;
            li.addEventListener('click', () => loadAndPlay(index));
            playlistEl.appendChild(li);
        });
    }

    function loadTrack(index) {
        currentTrackIndex = (index < 0) ? filteredPlaylist.length - 1 : (index >= filteredPlaylist.length) ? 0 : index;
        const track = filteredPlaylist[currentTrackIndex];
        audioPlayer.src = track.url;
        trackTitle.textContent = 'Loading...';
        albumName.textContent = `${track.artist} - ${track.album}`;
        albumArt.src = track.art;
        document.querySelectorAll('.playlist li').forEach((item, i) => {
            item.className = i === currentTrackIndex ? 'active' : '';
        });
        progress.style.width = '0%';
        currentTimeEl.textContent = '0:00';
        updateLikeButton();
    }

    function playTrack() {
        audioPlayer.play().then(() => {
            isPlaying = true;
            playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
            document.querySelector('.music-card').classList.add('is-playing');
        }).catch(err => console.error('Play error:', err));
    }

    function pauseTrack() {
        audioPlayer.pause();
        isPlaying = false;
        playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
        document.querySelector('.music-card').classList.remove('is-playing');
    }

    function loadAndPlay(index) {
        loadTrack(index);
        playTrack();
    }

    function nextTrack() {
        if (isShuffleOn && filteredPlaylist.length > 1) {
            let randomIndex;
            do {
                randomIndex = Math.floor(Math.random() * filteredPlaylist.length);
            } while (randomIndex === currentTrackIndex);
            loadAndPlay(randomIndex);
        } else {
            loadAndPlay(currentTrackIndex + 1);
        }
    }

    function formatTime(seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    }

    let fakeListeners = 42;
    function updateListenerCount() {
        fakeListeners += Math.floor(Math.random() * 3) - 1;
        fakeListeners = Math.max(10, Math.min(100, fakeListeners));
        listenerCountEl.textContent = fakeListeners;
        socialListenerCountEl.textContent = fakeListeners;
    }
    setInterval(updateListenerCount, 5000);

    searchInput.addEventListener('input', () => {
        const query = searchInput.value.toLowerCase().trim();
        clearSearch.style.visibility = query ? 'visible' : 'hidden';
        isSearching = !!query;

        if (query) {
            filteredPlaylist = playlist.filter(track =>
                track.title.toLowerCase().includes(query) ||
                track.artist.toLowerCase().includes(query)
            );
            currentAlbumTitle.textContent = `Search: "${searchInput.value}"`;
        } else {
            if (currentAlbum === 'Liked Songs') {
                filteredPlaylist = likedSongs;
                currentAlbumTitle.textContent = 'Liked Songs';
            } else {
                filteredPlaylist = currentAlbum === 'All' ? playlist : playlist.filter(track => track.album === currentAlbum);
                currentAlbumTitle.textContent = currentAlbum === 'All' ? 'All Tracks' : currentAlbum;
            }
        }

        currentTrackIndex = 0;
        renderPlaylist();
    });

    clearSearch.addEventListener('click', () => {
        searchInput.value = '';
        clearSearch.style.visibility = 'hidden';
        isSearching = false;

        if (currentAlbum === 'Liked Songs') {
            filteredPlaylist = likedSongs;
            currentAlbumTitle.textContent = 'Liked Songs';
        } else {
            filteredPlaylist = currentAlbum === 'All' ? playlist : playlist.filter(track => track.album === currentAlbum);
            currentAlbumTitle.textContent = currentAlbum === 'All' ? 'All Tracks' : currentAlbum;
        }

        currentTrackIndex = 0;
        renderPlaylist();
        searchInput.focus();
    });

    shuffleBtn.addEventListener('click', () => {
        isShuffleOn = !isShuffleOn;
        shuffleBtn.classList.toggle('active', isShuffleOn);
        shuffleBtn.title = isShuffleOn ? 'Shuffle On' : 'Shuffle Off';
    });

    function updateLikeButton() {
        const currentTrack = filteredPlaylist[currentTrackIndex];
        if (!currentTrack) return;

        const isLiked = likedSongs.some(song =>
            song.title === currentTrack.title && song.artist === currentTrack.artist
        );

        likeBtn.classList.toggle('liked', isLiked);
        likeBtn.innerHTML = isLiked ? '<i class="fas fa-heart"></i>' : '<i class="far fa-heart"></i>';
        likeBtn.title = isLiked ? 'Unlike Song' : 'Like Song';
    }

    likeBtn.addEventListener('click', () => {
        const currentTrack = filteredPlaylist[currentTrackIndex];
        if (!currentTrack) return;

        const existingIndex = likedSongs.findIndex(song =>
            song.title === currentTrack.title && song.artist === currentTrack.artist
        );

        if (existingIndex >= 0) {
            likedSongs.splice(existingIndex, 1);
        } else {
            likedSongs.push({
                title: currentTrack.title,
                artist: currentTrack.artist,
                album: currentTrack.album,
                url: currentTrack.url,
                art: currentTrack.art,
                likedAt: new Date().toISOString()
            });
        }

        localStorage.setItem(LIKED_SONGS_KEY, JSON.stringify(likedSongs));
        updateLikeButton();
        renderAlbumList();
    });

    playPauseBtn.addEventListener('click', () => isPlaying ? pauseTrack() : playTrack());
    prevBtn.addEventListener('click', () => loadAndPlay(currentTrackIndex - 1));
    nextBtn.addEventListener('click', nextTrack);

    volumeSlider.addEventListener('input', () => {
        const volume = volumeSlider.value / 100;
        audioPlayer.volume = volume;
        volumeIcon.className = `fas ${volume > 0.5 ? 'fa-volume-up' : volume > 0 ? 'fa-volume-down' : 'fa-volume-mute'}`;
    });

    progressBar.addEventListener('click', (e) => {
        const width = progressBar.clientWidth;
        const clickX = e.offsetX;
        audioPlayer.currentTime = (clickX / width) * audioPlayer.duration;
    });

    audioPlayer.addEventListener('timeupdate', () => {
        const { currentTime, duration } = audioPlayer;
        if (!isNaN(duration)) {
            progress.style.width = `${(currentTime / duration) * 100}%`;
            currentTimeEl.textContent = formatTime(currentTime);
            totalTimeEl.textContent = formatTime(duration);
        }
    });

    audioPlayer.addEventListener('loadedmetadata', () => {
        trackTitle.textContent = filteredPlaylist[currentTrackIndex].title;
        totalTimeEl.textContent = formatTime(audioPlayer.duration);
    });

    audioPlayer.addEventListener('ended', nextTrack);
    audioPlayer.addEventListener('error', () => {
        console.error('Audio error:', audioPlayer.error.message);
        trackTitle.textContent = 'Error loading track';
    });

    // Initialize
    renderAlbumList();
    filterAndRenderPlaylist();
});
