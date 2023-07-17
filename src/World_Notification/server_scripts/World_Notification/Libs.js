// priority: 50

/**
 * Send Notify to Player with Config
 *
 * @param {Internal.Player} player
 * @param {{}} config
 */
function playerNotify(player, config) {
  player.notify(
    Notification.make((notification) => {
      Object.assign(notification, config);
    })
  );
}
