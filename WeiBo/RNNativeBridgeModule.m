//
//  RNNativeBridgeModule.m
//  WeiBo
//
//  Created by WeiHu on 2017/5/5.
//  Copyright © 2017年 胡伟. All rights reserved.
//

#import "RNNativeBridgeModule.h"
#import "WeiboSDK.h"


@interface RNNativeBridgeModule ()
@property (nonatomic, copy) RCTResponseSenderBlock callback;
@property (nonatomic, copy) RCTPromiseResolveBlock resolve;
@property (nonatomic, copy) RCTPromiseRejectBlock reject;
@end

@implementation RNNativeBridgeModule

- (instancetype)init
{
    self = [super init];
    if (self) {
        [[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(weiboLoginSuccess:) name:@"WEIBOLOGINSUCCESS" object:nil];
    }
    return self;
}

- (void)weiboLoginSuccess:(NSNotification *)notfication{
    if (self.callback) {
        self.callback(@[[NSNull null],notfication.object]);
    }
    
//    if (self.resolve) {
//        self.resolve(notfication.object);
//    }
}

RCT_EXPORT_MODULE()

RCT_EXPORT_METHOD(RNInvokeOCCallBack:(NSDictionary *)dictionary callback:(RCTResponseSenderBlock)callback){
    NSLog(@"接收到RN传过来的数据为:%@",dictionary);
    [self ssoButtonPressed];
    self.callback = callback;
    // Date is ready to use!
}

RCT_EXPORT_METHOD(RNInvokeOCPromise:(NSDictionary *)dictionary
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject){
    [self ssoButtonPressed];
    self.resolve = resolve;
    self.reject = reject;
    
}
- (void)ssoButtonPressed
{
    WBAuthorizeRequest *request = [WBAuthorizeRequest request];
    request.redirectURI = @"https://api.weibo.com/oauth2/default.html";
    request.scope = @"all";
    [WeiboSDK sendRequest:request];
}

@end
