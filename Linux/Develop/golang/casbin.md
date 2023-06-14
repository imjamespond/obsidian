使用casbin做基于RBAC的权限验证

---
https://casbin.org/en/editor/
https://casbin.org/docs/zh-CN/syntax-for-models
 For example, one rule permits and the other denies.
The above policy effect means if there's any matched policy rule of allow, the final effect is allow (aka allow-override). p.eft is the effect for a policy, it can be allow or deny. It's optional and the default value is allow. So as we didn't specify it above, it uses the default value.任一policy允许,最后就允许
```
[policy_effect]e = some(where (p.eft == allow))
```

The supported built-in policy effects are: 

Policy effect 意义 示例
some(where (p.eft == allow)) 
allow-override 
ACL, RBAC, etc.

!some(where (p.eft == deny)) 
deny-override 
Deny-override

some(where (p.eft == allow)) && !some(where (p.eft == deny)) 
allow-and-deny 
Allow-and-deny
priority(p.eft) || deny 
priority 
Priority
subjectPriority(p.eft) 
基于角色的优先级 
主题优先级
