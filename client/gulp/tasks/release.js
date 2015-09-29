import gulp from 'gulp';
import bump from 'gulp-bump';
import git from 'gulp-git';
import filter from 'gulp-filter';
import tag from 'gulp-tag-version';

import runSequence from 'run-sequence';

var config = {
  importance: 'patch'
};

function getImportance() {
  return config.importance;
}

function release() {
  runSequence(
      'test:once',
      'lint',
      'clean',
      'copy:build', [
          'browserify:build',
          'browserify:vendor:build',
          'scss:build'
      ],
      'cachebust',
      'handlebars:build',
      'bump',
      'changelog',
      'commit-release'
  );
}

gulp.task('bump', function() {
  return gulp.src([
        './bower.json',
        './package.json'
      ])
      .pipe(bump({
        type: getImportance()
      }))
      .pipe(gulp.dest('./'));
});

gulp.task('commit-release', function() {
  return gulp.src([
          './bower.json',
          './package.json',
          './CHANGELOG.md',
          './dist'
      ])
      .pipe(git.add({
        args: '-f -A'
      }))
      .pipe(git.commit('chore(release): New ' + getImportance() + ' release'))
      .pipe(filter('bower.json'))
      .pipe(tag());
});

gulp.task('release:patch', function() {
  return release();
});

gulp.task('release:minor', function() {
  config.importance = 'minor';

  return release();
});

gulp.task('release:major', function() {
  config.importance = 'major';

  return release();
});
