
            </div> <!-- .main-content -->
        </div> <!-- .body-content -->

        <!-- footer -->
        <footer class="footer" role="contentinfo">
            <!-- copyright -->
            <div class="row">
                <div class="copyright column small-8 text-center">
                    <?php echo '© 2015' + get_bloginfo('name');?>
                </div>
                <div class="designed-by column small-4">
                    <?php  _e("Designed by:  <a href='http://bienen.ru/' title='Bienen'>Bienen</a>", 'bienen');?>
                </div>
            </div>
            <!-- /copyright -->
            <!-- /copyright -->
        </footer>
        <!-- /footer -->

        <?php wp_footer(); ?>

        <!-- analytics -->
        <script>
            (function(f,i,r,e,s,h,l){i['GoogleAnalyticsObject']=s;f[s]=f[s]||function(){
                (f[s].q=f[s].q||[]).push(arguments)},f[s].l=1*new Date();h=i.createElement(r),
                l=i.getElementsByTagName(r)[0];h.async=1;h.src=e;l.parentNode.insertBefore(h,l)
            })(window,document,'script','//www.google-analytics.com/analytics.js','ga');
            ga('create', 'UA-XXXXXXXX-XX', 'yourdomain.com');
            ga('send', 'pageview');
        </script>
    </body>
</html>