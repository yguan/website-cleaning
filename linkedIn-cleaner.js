(function($) {
    var startTime = new Date();
    var adSelectors = [
        '.feed-update.company-share-article.is-sponsored',
        '.feed-update.pulse-recommend-article-rollup',
        '.feed-update.company-post-text',
        '.feed-update.company-recommend-job-digest',
        '.feed-update.company-recommend-job',
        '.feed-update.company-share-article'
    ];

    function removeElement(selector) {
        $(selector).remove();
    }

    function removeAds() {
        adSelectors.forEach(removeElement);
    }

    function removeAPostByDay(postElement, nDaysAgo) {
        var $el = $(postElement),
            $timestamps = $el.find('.timestamp'),
            timestamp = $timestamps.length > 0 ? $timestamps[0].innerHTML : '';
        if (timestamp.replace('d', '') >= nDaysAgo) {
            $el.remove();
        }
    }

    function removeAPostByName(postElement, namesToRemove) {
        var $el = $(postElement),
            $names = $el.find('.miniprofile.name'),
            name = $names.length > 0 ? $names[0].innerHTML : '';
        if (namesToRemove && namesToRemove.indexOf(name) > -1) {
            $el.remove();
        }
    }

    function removePosts(nDaysAgo, namesToRemove) {
        $('.feed-update').each(function(index, post) {
            removeAPostByDay(post, nDaysAgo);
            if (namesToRemove && namesToRemove.length > 0) {
                removeAPostByName(post, namesToRemove);
            }
        });
    }

    function fetchPosts(scrollDownToPixels, cleanPost, onComplete) {
        var timer = {};
        var scrollDown = function() {
            if (document.body.clientHeight > scrollDownToPixels || $('.end-of-feed').length > 0) {
                clearInterval(timer.intervalId);
                onComplete();
            } else {
                document.body.scrollTop = scrollDownToPixels;
                console.log('fetching posts');
            }
            cleanPost();
        };
        timer.intervalId = setInterval(scrollDown, 1000);
    }

    function clean(config) {
        fetchPosts(config.scrollDownToPixels, function() {
            removeAds();
            removePosts(config.nDaysAgo, config.namesToRemove);
        }, function() {
            document.body.scrollTop = 0;
            var endTime = new Date();
            var elapsedTime = (endTime - startTime) / 1000;
            console.log('Cleaning is done. Elapsed time: ' + elapsedTime + ' seconds');
        });
    }

    clean({
        scrollDownToPixels: 20000, // 50,000
        nDaysAgo: 20,
        namesToRemove: ['name 1', 'name 2']
    });
})(window.$);
