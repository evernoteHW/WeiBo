//
//  RNNativeBridgeModule.m
//  WeiBo
//
//  Created by WeiHu on 2017/5/5.
//  Copyright © 2017年 胡伟. All rights reserved.
//

#import "RNNativeBridgeModule.h"
#import "WeiboSDK.h"


@implementation RNNativeBridgeModule

RCT_EXPORT_MODULE()

RCT_EXPORT_METHOD(AddEvent:(NSDictionary *)dictionary)
{
    NSLog(@"接收到RN传过来的数据为:%@",dictionary);
    [self ssoButtonPressed];
    // Date is ready to use!
}
- (void)ssoButtonPressed
{
    WBAuthorizeRequest *request = [WBAuthorizeRequest request];
    request.redirectURI = @"https://api.weibo.com/oauth2/default.html";
    request.scope = @"all";
    request.userInfo = @{@"SSO_From": @"SendMessageToWeiboViewController",
                         @"Other_Info_1": [NSNumber numberWithInt:123],
                         @"Other_Info_2": @[@"obj1", @"obj2"],
                         @"Other_Info_3": @{@"key1": @"obj1", @"key2": @"obj2"}};
    [WeiboSDK sendRequest:request];
}

@end
